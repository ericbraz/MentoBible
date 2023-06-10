import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userState/userSlice'

const store = configureStore({
   reducer: {
      userState: userReducer,
   },
})

export default store
export type RootState = ReturnType<typeof store.getState>
