import { Query, Unsubscribe, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { Chapter, CourseCreationType } from './interfaces'
import { db } from '@/config/firebase'
import { generateID } from '@/utils/modelHelper'

export default class ChapterModel implements Chapter {
   private chapter: Chapter

   constructor(chapter: Omit<Chapter, 'id' | 'isActive'>) {
      const filteredChapter = Object.fromEntries(
         Object.entries(chapter).filter(([_, value]) => value !== undefined)
      ) as Omit<Chapter, 'id' | 'isActive'>
      this.chapter = this.createFullerChapterModel({ id: generateID(), ...filteredChapter })
   }

   public static get PATH() {
      return 'chapter'
   }

   public static async find(id: string) {
      const docRef = await getDoc(doc(db, this.PATH, id))
      if (!docRef.exists()) return null
      const categoryModel = new ChapterModel(docRef.data() as Chapter)
      return categoryModel
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, (snapshot) => {
         const categories: ChapterModel[] = []
         snapshot.forEach((document) => {
            const chapter = document.data()
            const categoryModel = new ChapterModel(chapter as Chapter)
            categories.push(categoryModel)
         })
         setFunction(categories)
      })
      return unsubscribe
   }

   public get id()                  { return this.chapter.id }
   public get courseId()            { return this.chapter.courseId }
   public get name()                { return this.chapter.name }
   public get chapterSequence()     { return this.chapter.chapterSequence }
   public get isActive()            { return this.chapter.isActive }
   public get creationDate()        { return this.chapter.creationDate }
   public get description()         { return this.chapter.description }
   public get thumbnailURL()        { return this.chapter.thumbnailURL }
   public get coverURL()            { return this.chapter.coverURL }
   public get userCreatorId()       { return this.chapter.userCreatorId }

   private isValid() {
      if (
         !this.id &&
         !this.courseId &&
         !this.name &&
         !this.chapterSequence &&
         !this.isActive &&
         !this.userCreatorId
      )
         return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, ChapterModel.PATH, this.id)
      await setDoc(docRef, this.chapter)
   }

   public async delete() {
      const docRef = doc(db, ChapterModel.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerChapterModel(chapter: Omit<Chapter, 'isActive'>) {
      if (chapter.creationDate instanceof Date)
         return { ...chapter, isActive: 'creation' as CourseCreationType }

      const { creationDate, ...rest } = { ...chapter }
      const timestamp = creationDate
      return {
         ...rest,
         isActive: 'creation' as CourseCreationType,
         creationDate: timestamp instanceof Date ? timestamp : new Date(),
      }
   }
}
