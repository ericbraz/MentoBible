import { db } from '@/config/firebase'
import CategoryModel from '@/models/CategoryModel'
import { getCategoriesState, rescueCategoriesState } from '@/store/coursesSlice'
import { collection, orderBy, query } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useCoursesState() {
   const dispatch = useDispatch()

   const categoriesState = useSelector(getCategoriesState)
   const setCategoriesState = async function (id?: string) {
      const setCategories = (categories: CategoryModel[]) => {
         dispatch(rescueCategoriesState(categories))
      }
      if (id) {
         const data = await CategoryModel.find(id)
         data && setCategories([data])
      } else {
         const categoriesRef = collection(db, CategoryModel.PATH)
         const mainQuery = query(categoriesRef, orderBy('name'))
         CategoryModel.listenToQuery(mainQuery, setCategories)
      }
   }

   useEffect(() => {
      setCategoriesState()
   }, [])

   return { categoriesState, setCategoriesState }
}
