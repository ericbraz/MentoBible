import { Query, Unsubscribe, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { Role, RoleNames } from './interfaces'
import { db } from '@/config/firebase'
import { generateID } from '@/utils/modelHelper'
import { DEFAULT_ROLE_ID } from '@/constants/firebase'

export default class RoleModel implements Role {
   private role: Role
   private roleNames = ['user', 'moderator', 'administrator', 'master'] as RoleNames[]

   constructor(role: Omit<Role, 'id' | 'idSystem'>) {
      this.role = this.createFullerCategoryModel({ id: generateID(), ...role })
   }

   public static get PATH() {
      return 'role'
   }

   public static async find(id: string) {
      const newId = id !== '' ? id : DEFAULT_ROLE_ID
      const docRef = await getDoc(doc(db, this.PATH, newId))
      if (!docRef.exists()) return null
      const categoryModel = new RoleModel(docRef.data() as Role)
      return categoryModel
   }

   public static async findInArray(id: string[]) {
      const finalArray: RoleModel[] = []
      for (let i of id) {
         const role = await RoleModel.find(i)
         role && finalArray.push(role)
      }
      return finalArray
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, (snapshot) => {
         const categories: RoleModel[] = []
         snapshot.forEach((document) => {
            const role = document.data()
            const categoryModel = new RoleModel(role as Role)
            categories.push(categoryModel)
         })
         setFunction(categories)
      })
      return unsubscribe
   }

   public get id()                  { return this.role.id }
   public get name()                { return this.role.name }
   public get idSystem()            { return this.role.idSystem }

   private isValid() {
      if (!this.id && this.roleNames.includes(this.name) && !this.idSystem) return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, RoleModel.PATH, this.id)
      await setDoc(docRef, this.role)
   }

   public async delete() {
      const docRef = doc(db, RoleModel.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerCategoryModel(
      role: Omit<Role, 'idSystem'> & Partial<Pick<Role, 'idSystem'>>
   ) {
      if (!role.idSystem) return { ...role, idSystem: [] as string[] }

      return role as Role
   }
}
