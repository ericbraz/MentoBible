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
            ],
            ignoredPaths: [
               'coursesState.categories',
               'userState.data.signUpDate',
               'userState.systems',
            ],
         },
      }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
