import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { FormattedUserState, userStateFormatter } from '@/utils/authUserHelper'

export interface ReduxUserState {
   data: FormattedUserState
}
const initialState: ReduxUserState = {
   data: userStateFormatter(null),
}

export const userSlice = createSlice({
   name: 'userState',
   initialState,
   reducers: {
      changeUserState: (state, { payload }: PayloadAction<ReduxUserState['data']>) => {
         state.data = payload
      },
   },
})

export default userSlice.reducer
export const { changeUserState } = userSlice.actions
export const getUserState = (state: RootState) => {
   return state.userState.data
}
