import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userState/userSlice'
import toastReducer from './toastSlice'

const store = configureStore({
   reducer: {
      userState: userReducer,
      toastState: toastReducer,
   },
})

export default store
export type RootState = ReturnType<typeof store.getState>
