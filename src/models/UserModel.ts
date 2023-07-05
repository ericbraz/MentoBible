import { Query, Unsubscribe, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { User } from './interfaces'
import { db } from '@/config/firebase'
import { USER_ROLE_ID } from '@/constants/firebase'

export default class UserModel implements User {
   private user: User

   constructor(user: User) {
      this.user = this.createFullerUserModel(user)
   }

   public static get PATH() { return 'user' }

   public static async find(id: string) {
      const docRef = await getDoc(doc(db, this.PATH, id))
      if (!docRef.exists()) return null
      const userModel = new UserModel(docRef.data() as User)
      return userModel
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, snapshot => {
         const users: UserModel[] = []
         snapshot.forEach(document => {
            const user = document.data()
            if (user.dateOfBirth) {
               user.dateOfBirth = user.dateOfBirth.toDate()
            }
            const userModel = new UserModel(user as User)
            users.push(userModel)
         })
         setFunction(users)
      })
      return unsubscribe
   }

   public get id()                  { return this.user.id }
   public get firstName()           { return this.user.firstName }
   public get lastName()            { return this.user.lastName }
   public get email()               { return this.user.email }
   public get active()              { return this.user.active }
   public get photoURL()            { return this.user.photoURL }
   public get signUpDate()          { return this.user.signUpDate }
   public get userRole()            { return this.user.userRoleIds }
   public get courseIds()           { return this.user.courseIds }
   public get lessonCompletionIds() { return this.user.lessonCompletionIds }

   private isValid() {
      if (!this.id && !this.firstName && !this.lastName && !this.email) return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, UserModel.PATH, this.id)
      await setDoc(docRef, this.user)
   }

   public async delete() {
      const docRef = doc(db, UserModel.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerUserModel(user: User) {
      if (user.signUpDate instanceof Date)
         return {
            ...user,
            userRole: [USER_ROLE_ID],
         }
      const { signUpDate, ...rest } = { ...user }
      const timestamp = signUpDate

      return {
         ...rest,
         signUpDate: timestamp instanceof Date ? timestamp : new Date(),
         userRole: [USER_ROLE_ID],
      }
   }
}
