import { Query, Unsubscribe, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { System } from './interfaces'
import { db } from '@/config/firebase'
import { generateID } from '@/utils/modelHelper'
import { DEFAULT_SYSTEM_ID } from '@/constants/firebase'

export default class SystemModel implements System {
   private system: System

   constructor(system: Omit<System, 'id'>) {
      this.system = { id: generateID(), ...system }
   }

   public static get PATH() {
      return 'system'
   }

   public static async find(id: string) {
      const newId = id !== '' ? id : DEFAULT_SYSTEM_ID
      const docRef = await getDoc(doc(db, this.PATH, newId))
      if (!docRef.exists()) return null
      const categoryModel = new SystemModel(docRef.data() as System)
      return categoryModel
   }

   public static async findInArray(id: string[]) {
      const finalArray: SystemModel[] = []
      for (let i of id) {
         const role = await SystemModel.find(i)
         role && finalArray.push(role)
      }
      return finalArray
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, (snapshot) => {
         const categories: SystemModel[] = []
         snapshot.forEach((document) => {
            const system = document.data()
            const categoryModel = new SystemModel(system as System)
            categories.push(categoryModel)
         })
         setFunction(categories)
      })
      return unsubscribe
   }

   public get id()                  { return this.system.id }
   public get systemName()          { return this.system.systemName }
   public get systemPath()          { return this.system.systemPath }

   private isValid() {
      if (!this.id && !this.systemName && !this.systemPath) return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, SystemModel.PATH, this.id)
      await setDoc(docRef, this.system)
   }

   public async delete() {
      const docRef = doc(db, SystemModel.PATH, this.id)
      return await deleteDoc(docRef)
   }
}
