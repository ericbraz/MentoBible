import { Query, Timestamp, Unsubscribe, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { Category } from './interfaces'
import { db } from '@/config/firebase'
import { generateID } from '@/utils/modelHelper'

export default class CategoryModel implements Category {
   private category: Category

   constructor(category: Omit<Category, 'id'>) {
      const filteredCategory = Object.fromEntries(
         Object.entries(category).filter(([_, value]) => value !== undefined)
      ) as Omit<Category, 'id'>
      this.category = this.createFullerCategoryModel({ id: generateID(), ...filteredCategory })
   }

   public static get PATH() {
      return 'category'
   }

   public static async find(id: string) {
      const docRef = await getDoc(doc(db, this.PATH, id))
      if (!docRef.exists()) return null
      const categoryModel = new CategoryModel(docRef.data() as Category)
      return categoryModel
   }

   public static listenToQuery(q: Query, setFunction: Function): Unsubscribe {
      const unsubscribe = onSnapshot(q, (snapshot) => {
         const categories: CategoryModel[] = []
         snapshot.forEach((document) => {
            const category = document.data()
            const categoryModel = new CategoryModel(category as Category)
            categories.push(categoryModel)
         })
         setFunction(categories)
      })
      return unsubscribe
   }

   public get id()                  { return this.category.id }
   public get name()                { return this.category.name }
   public get creationDate()        { return this.category.creationDate }
   public get thumbnailURL()        { return this.category.thumbnailURL }
   public get coverURL()            { return this.category.coverURL }
   public get userCreatorId()       { return this.category.userCreatorId }

   private isValid() {
      if (!this.id && !this.name) return false

      return true
   }

   public async save() {
      if (!this.isValid()) throw new Error('Object initialization one or more attributes')
      const docRef = doc(db, CategoryModel.PATH, this.id)
      await setDoc(docRef, this.category)
   }

   public async delete() {
      const docRef = doc(db, CategoryModel.PATH, this.id)
      return await deleteDoc(docRef)
   }

   private createFullerCategoryModel(category: Category) {
      if (category.creationDate instanceof Date) return category

      const { creationDate, ...rest } = { ...category }
      const timestamp = creationDate instanceof Date ? creationDate : creationDate as unknown as Timestamp
      return {
         ...rest,
         creationDate: timestamp instanceof Date ? timestamp : timestamp.toDate(),
      }
   }
}
