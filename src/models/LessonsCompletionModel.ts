import { Query, Unsubscribe, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { LessonsCompletion } from './interfaces'
import { db } from '@/config/firebase'
import { generateID } from '@/utils/modelHelper'

export default class LessonsCompletionModel implements LessonsCompletion {
   private lessonsCompletion: LessonsCompletion

   constructor(lessonsCompletion: Omit<LessonsCompletion, 'id' | 'completionDate'>) {
      const filteredLessonCompletion = Object.fromEntries(
         Object.entries(lessonsCompletion).filter(([_, value]) => value !== undefined)
      ) as Omit<LessonsCompletion, 'id' | 'completionDate'>
      this.lessonsCompletion = this.createFullerCategoryModel({
         id: generateID(),
         ...filteredLessonCompletion,
      })
   }

   public static get PATH() {
      return 'lessonsCompletion'
   }

   public static async find(id: string) {
      const docRef = await getDoc(doc(db, this.PATH, id))
      if (!docRef.exists()) return null
      const lessonsCompletionModel = new LessonsCompletionModel(docRef.data() as LessonsCompletion)
      return lessonsCompletionModel
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, (snapshot) => {
         const lessonsCompleted: LessonsCompletionModel[] = []
         snapshot.forEach((document) => {
            const lessonsCompletion = document.data()
            const lessonsCompletionModel = new LessonsCompletionModel(lessonsCompletion as LessonsCompletion)
            lessonsCompleted.push(lessonsCompletionModel)
         })
         setFunction(lessonsCompleted)
      })
      return unsubscribe
   }

   public get id()                       { return this.lessonsCompletion.id }
   public get userId()                   { return this.lessonsCompletion.userId }
   public get courseId()                 { return this.lessonsCompletion.courseId }
   public get chapterId()                { return this.lessonsCompletion.chapterId }
   public get lessonId()                 { return this.lessonsCompletion.lessonId }
   public get completionDate()           { return this.lessonsCompletion.completionDate }

   private isValid() {
      if (!this.id && !this.userId && !this.lessonId && !this.completionDate) return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, LessonsCompletionModel.PATH, this.id)
      await setDoc(docRef, this.lessonsCompletion)
   }

   public async delete() {
      const docRef = doc(db, LessonsCompletionModel.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerCategoryModel(lessonsCompletion: Omit<LessonsCompletion, 'completionDate'>) {
      return {
         ...lessonsCompletion,
         completionDate: new Date(),
      }
   }
}
