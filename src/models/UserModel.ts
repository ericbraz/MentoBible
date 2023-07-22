import {
   Query,
   Unsubscribe,
   deleteDoc,
   doc,
   getDoc,
   onSnapshot,
   setDoc,
   updateDoc,
} from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { User } from './interfaces'
import { db, storage } from '@/config/firebase'
import { USER_ROLE_ID } from '@/constants/firebase'
import { filterUndefinedInObjectsToExclusion, userNameFormatter } from '@/utils/modelHelper'

export default class UserModel implements User {
   private user: User
   private previousImage: string | undefined

   constructor(user: User) {
      const filteredUser = Object.fromEntries(
         Object.entries(user).filter(([_, value]) => value !== undefined)
      ) as User
      this.user = this.createFullerUserModel(filteredUser)
   }

   public static get PATH() {
      return 'user'
   }

   public static async find(id: string) {
      const docRef = await getDoc(doc(db, this.PATH, id))
      if (!docRef.exists()) return null
      const userModel = new UserModel(docRef.data() as User)
      return userModel
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, (snapshot) => {
         const users: UserModel[] = []
         snapshot.forEach((document) => {
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
   public get userName()            { return this.user.userName }
   public get bioDescription()      { return this.user.bioDescription }
   public get photoURL()            { return this.user.photoURL }
   public get signUpDate()          { return this.user.signUpDate }
   public get userRoleIds()         { return this.user.userRoleIds }
   public get courseIds()           { return this.user.courseIds }
   public get lessonCompletionIds() { return this.user.lessonCompletionIds }

   private isValid() {
      if (!this.id && !this.firstName && !this.lastName && !this.email && !this.active) return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, UserModel.PATH, this.id)
      await setDoc(docRef, this.user)
   }

   public async update() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, UserModel.PATH, this.id)

      UserModel.find(this.id)
         ?.then(async (userData) => {
            this.previousImage = userData?.photoURL
            console.log(this.previousImage)
            const imageRef = !!this.previousImage && ref(storage, this.previousImage)
            !!imageRef && (await deleteObject(imageRef))
         })
         .then(async () => {
            const userDataToUpdate = filterUndefinedInObjectsToExclusion({
               userName: this.userName,
               bioDescription: this.bioDescription,
               photoURL: this.photoURL,
            })
            await updateDoc(docRef, userDataToUpdate)
         })
   }

   public async delete() {
      const docRef = doc(db, UserModel.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerUserModel(user: User) {
      const { firstName, lastName, signUpDate, userRoleIds, userName } = { ...user }
      const timestamp = signUpDate
      const obj = {
         ...user,
         userName: userName ?? userNameFormatter(firstName, lastName),
         userRoleIds: !!userRoleIds && userRoleIds.length > 0 ? userRoleIds : [USER_ROLE_ID],
         signUpDate: timestamp instanceof Date ? timestamp : new Date(),
      }

      return obj
   }
}
