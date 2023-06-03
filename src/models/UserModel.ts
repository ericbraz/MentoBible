import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { User, UserRole } from './interfaces'
import { db } from '@/config/firebase'

export default class UserModel implements User {
   private user: User
   private PATH = 'user'

   constructor(user: User) {
      this.user = this.createFullerUserModel(user)
   }

   public get id()                  { return this.user.id }
   public get firstName()           { return this.user.firstName }
   public get lastName()            { return this.user.lastName }
   public get email()               { return this.user.email }
   public get photoURL()            { return this.user.photoURL }
   public get signUpDate()          { return this.user.signUpDate }
   public get userRole()            { return this.user.userRole }
   public get courseIds()           { return this.user.courseIds }
   public get lessonCompletionIds() { return this.user.lessonCompletionIds }
   public get testCompletionIds()   { return this.user.testCompletionIds }
   public get performance()         { return this.user.performance }

   private isValid() {
      if (!this.id && !this.firstName && !this.lastName && !this.email) return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, this.PATH, this.id)
      await setDoc(docRef, this.user)
   }

   public async delete() {
      const docRef = doc(db, this.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerUserModel(user: User) {
      if (user.signUpDate instanceof Date)
         return {
            ...user,
            userRole: 'user' as UserRole
         }
      const { signUpDate, ...rest } = { ...user }
      const timestamp = signUpDate

      return {
         ...rest,
         signUpDate: timestamp instanceof Date ? timestamp : new Date(),
         userRole: 'user' as UserRole,
      }
   }
}
