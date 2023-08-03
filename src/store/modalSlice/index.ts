import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface FunctionalModalObject {
   text: string
   leftButtonText: string
   rightButtonText?: string
   onClick: () => Promise<void>
   visibility: boolean
}
const initialState: FunctionalModalObject = {
   text: '',
   leftButtonText: '',
   rightButtonText: '',
   onClick: async () => {},
   visibility: false,
}

export const modalSlice = createSlice({
   name: 'toastState',
   initialState,
   reducers: {
      changeModalState: (state, { payload }: PayloadAction<FunctionalModalObject>) => {
         state.text = payload.text
         state.leftButtonText = payload.leftButtonText
         state.rightButtonText = payload.rightButtonText
         state.onClick = payload.onClick
         state.visibility = payload.visibility
      },
   },
})

export default modalSlice.reducer
export const { changeModalState } = modalSlice.actions
export const getModalState = (state: RootState) => {
   return state.modalState
}
