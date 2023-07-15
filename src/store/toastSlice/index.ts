import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface ReduxToastState {
   title: string
   description: string
   type: 'success' | 'info' | 'error' | 'loader'
   visibility: boolean
}
const initialState: ReduxToastState = {
   title: '',
   description: '',
   type: 'info',
   visibility: false,
}

export const toastSlice = createSlice({
   name: 'toastState',
   initialState,
   reducers: {
      changeToastState: (state, { payload }: PayloadAction<ReduxToastState>) => {
         state.title = payload.title
         state.description = payload.description
         state.type = payload.type
         state.visibility = payload.visibility
      },
   },
})

export default toastSlice.reducer
export const { changeToastState } = toastSlice.actions
export const getToastState = (state: RootState) => {
   return state.toastState
}
