import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import CategoryModel from '@/models/CategoryModel'
import CourseModel from '@/models/CourseModel'
import ChapterModel from '@/models/ChapterModel'
import LessonModel from '@/models/LessonModel'
import { LessonsCompletion } from '@/models/interfaces'

export interface ReduxCoursesState {
   categories: CategoryModel[] | null
   courses: CourseModel[] | null
   chapters: ChapterModel[] | null
   lessons: LessonModel[] | null
   lessonsCompletion: LessonsCompletion[] | null
}
const initialState: ReduxCoursesState = {
   categories: null,
   courses: null,
   chapters: null,
   lessons: null,
   lessonsCompletion: null,
}

export const coursesSlice = createSlice({
   name: 'coursesState',
   initialState,
   reducers: {
      rescueCategoriesState: (state, { payload }: PayloadAction<CategoryModel[] | null>) => {
         state.categories = payload
      },
      rescueCoursesState: (state, { payload }: PayloadAction<CourseModel[] | null>) => {
         state.courses = payload
      },
      rescueChaptersState: (state, { payload }: PayloadAction<ChapterModel[] | null>) => {
         state.chapters = payload
      },
      rescueLessonsState: (state, { payload }: PayloadAction<LessonModel[] | null>) => {
         state.lessons = payload
      },
      rescueLessonsCompletionState: (
         state,
         { payload }: PayloadAction<LessonsCompletion[] | null>
      ) => {
         state.lessonsCompletion = payload
      },
   },
})

export default coursesSlice.reducer
export const {
   rescueCategoriesState,
   rescueCoursesState,
   rescueChaptersState,
   rescueLessonsState,
   rescueLessonsCompletionState,
} = coursesSlice.actions
export const getCategoriesState = (state: RootState) => {
   return state.coursesState.categories
}
export const getCoursesState = (state: RootState) => {
   return state.coursesState.courses
}
export const getChaptersState = (state: RootState) => {
   return state.coursesState.chapters
}
export const getLessonsState = (state: RootState) => {
   return state.coursesState.lessons
}
export const getLessonsCompletionState = (state: RootState) => {
   return state.coursesState.lessonsCompletion
}
