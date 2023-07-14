import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userState/userSlice'
import toastReducer from './toastSlice'
import coursesReducer from './coursesSlice'

const store = configureStore({
   reducer: {
      userState: userReducer,
      toastState: toastReducer,
      coursesState: coursesReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [
               'userState/attributeUserData',
               'coursesState/rescueCategoriesState',
               'userState/findUserSystems',
               'coursesState/rescueCoursesState',
               'coursesState/rescueChaptersState',
               'coursesState/rescueLessonsState',
            ],
            ignoredPaths: [
               'coursesState.categories',
               'coursesState',
               'userState.data.signUpDate',
               'userState.systems',
               'coursesState.courses',
               'coursesState.chapters',
            ],
         },
      }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
