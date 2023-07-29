import { Query, Unsubscribe, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { Course, CourseCreationType } from './interfaces'
import { db } from '@/config/firebase'
import { generateID } from '@/utils/modelHelper'

export default class CourseModel implements Course {
   private course: Course

   constructor(course: Omit<Course, 'id' | 'isActive'>) {
      const filteredCourse = Object.fromEntries(
         Object.entries(course).filter(([_, value]) => value !== undefined)
      ) as Omit<Course, 'id' | 'isActive'>
      this.course = this.createFullerCourseModel({ id: generateID(), ...filteredCourse })
   }

   public static get PATH() {
      return 'course'
   }

   public static async find(id: string) {
      const docRef = await getDoc(doc(db, this.PATH, id))
      if (!docRef.exists()) return null
      const courseModel = new CourseModel(docRef.data() as Course)
      return courseModel
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, (snapshot) => {
         const courses: CourseModel[] = []
         snapshot.forEach((document) => {
            const course = document.data()
            const courseModel = new CourseModel(course as Course)
            courses.push(courseModel)
         })
         setFunction(courses)
      })
      return unsubscribe
   }

   public get id()                  { return this.course.id }
   public get categoryId()          { return this.course.categoryId }
   public get name()                { return this.course.name }
   public get isActive()            { return this.course.isActive }
   public get creationDate()        { return this.course.creationDate }
   public get isModular()           { return this.course.isModular }
   public get description()         { return this.course.description }
   public get thumbnailURL()        { return this.course.thumbnailURL }
   public get coverURL()            { return this.course.coverURL }
   public get userCreatorId()       { return this.course.userCreatorId }

   private isValid() {
      if (!this.id && !this.categoryId && !this.name && !this.isActive && !this.userCreatorId)
         return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, CourseModel.PATH, this.id)
      await setDoc(docRef, this.course)
   }

   public async delete() {
      const docRef = doc(db, CourseModel.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerCourseModel(course: Omit<Course, 'isActive'>) {
      if (course.creationDate instanceof Date)
         return { ...course, isActive: 'creation' as CourseCreationType }

      const { creationDate, ...rest } = { ...course }
      const timestamp = creationDate
      return {
         ...rest,
         isActive: 'creation' as CourseCreationType,
         creationDate: timestamp instanceof Date ? timestamp : new Date(),
      }
   }
}
