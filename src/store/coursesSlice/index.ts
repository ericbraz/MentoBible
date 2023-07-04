import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import CategoryModel from '@/models/CategoryModel'

export interface ReduxCoursesState {
   categories: CategoryModel[] | null
}
const initialState: ReduxCoursesState = {
   categories: null,
}

export const coursesSlice = createSlice({
   name: 'coursesState',
   initialState,
   reducers: {
      rescueCategoriesState: (state, { payload }: PayloadAction<any[]>) => {
         state.categories = payload
      },
   },
})

export default coursesSlice.reducer
export const { rescueCategoriesState } = coursesSlice.actions
export const getCategoriesState = (state: RootState) => {
   return state.coursesState.categories
}
export const getCoursesState = (state: RootState) => {
   return state.coursesState
}
