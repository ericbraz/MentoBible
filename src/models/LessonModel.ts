import { Query, Unsubscribe, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { Lesson, CourseCreationType } from './interfaces'
import { db } from '@/config/firebase'
import { generateID } from '@/utils/modelHelper'

export default class LessonModel implements Lesson {
   private lesson: Lesson

   constructor(lesson: Omit<Lesson, 'id' | 'isActive'>) {
      const filteredLesson = Object.fromEntries(
         Object.entries(lesson).filter(([_, value]) => value !== undefined)
      ) as Omit<Lesson, 'id' | 'isActive'>
      this.lesson = this.createFullerCategoryModel({ id: generateID(), ...filteredLesson })
   }

   public static get PATH() {
      return 'lesson'
   }

   public static async find(id: string) {
      const docRef = await getDoc(doc(db, this.PATH, id))
      if (!docRef.exists()) return null
      const categoryModel = new LessonModel(docRef.data() as Lesson)
      return categoryModel
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, (snapshot) => {
         const categories: LessonModel[] = []
         snapshot.forEach((document) => {
            const lesson = document.data()
            const categoryModel = new LessonModel(lesson as Lesson)
            categories.push(categoryModel)
         })
         setFunction(categories)
      })
      return unsubscribe
   }

   public get id()                       { return this.lesson.id }
   public get courseId()                 { return this.lesson.courseId }
   public get chapterId()                { return this.lesson.chapterId }
   public get name()                     { return this.lesson.name }
   public get title()                    { return this.lesson.title }
   public get videoURL()                 { return this.lesson.videoURL }
   public get lessonSequence()           { return this.lesson.lessonSequence }
   public get isActive()                 { return this.lesson.isActive }
   public get creationDate()             { return this.lesson.creationDate }
   public get description()              { return this.lesson.description }
   public get thumbnailURL()             { return this.lesson.thumbnailURL }
   public get coverURL()                 { return this.lesson.coverURL }
   public get userCreatorId()            { return this.lesson.userCreatorId }
   public get complementaryMaterialURL() { return this.lesson.complementaryMaterialURL }

   private isValid() {
      if (
         !this.id &&
         (!this.courseId || !this.chapterId) &&
         !this.name &&
         !this.title &&
         !this.videoURL &&
         !this.lessonSequence &&
         !this.isActive &&
         !this.userCreatorId
      )
         return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, LessonModel.PATH, this.id)
      await setDoc(docRef, this.lesson)
   }

   public async delete() {
      const docRef = doc(db, LessonModel.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerCategoryModel(lesson: Omit<Lesson, 'isActive'>) {
      if (lesson.creationDate instanceof Date)
         return { ...lesson, isActive: 'creation' as CourseCreationType }

      const { creationDate, ...rest } = { ...lesson }
      const timestamp = creationDate
      return {
         ...rest,
         isActive: 'creation' as CourseCreationType,
         creationDate: timestamp instanceof Date ? timestamp : new Date(),
      }
   }
}