import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userState/userSlice'
import toastReducer from './toastSlice'
import coursesReducer from './coursesSlice'
import modalReducer from './modalSlice'

const store = configureStore({
   reducer: {
      userState: userReducer,
      toastState: toastReducer,
      coursesState: coursesReducer,
      modalState: modalReducer,
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
               'coursesState/rescueLessonsCompletionState',
               'modalState/changeModalState',
            ],
            ignoredPaths: [
               'coursesState.categories',
               'coursesState',
               'userState.data.signUpDate',
               'userState.systems',
               'coursesState.courses',
               'coursesState.chapters',
               'coursesState.lessonsCompletion',
               'modalState.onClick',
            ],
         },
      }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
