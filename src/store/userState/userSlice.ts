import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { FormattedUserState, userStateData, userStateFormatter } from '@/utils/authUserHelper'
import { User } from '@/models/interfaces'

export interface ReduxUserState {
   auth: FormattedUserState
   data: User
}
const initialState: ReduxUserState = {
   auth: userStateFormatter(null),
   data: userStateData(null),
}

export const userSlice = createSlice({
   name: 'userState',
   initialState,
   reducers: {
      changeUserState: (state, { payload }: PayloadAction<ReduxUserState['auth']>) => {
         state.auth = payload
      },
      attributeUserData: (state, { payload }: PayloadAction<User>) => {
         state.data.id = payload.id
         state.data.firstName = payload.firstName
         state.data.lastName = payload.lastName
         state.data.email = payload.email
         state.data.active = payload.active
         state.data.userRoleIds = payload.userRoleIds
         state.data.photoURL = payload.photoURL as string
         //state.data.signUpDate = payload.signUpDate
         state.data.courseIds = payload.courseIds
         state.data.lessonCompletionIds = payload.lessonCompletionIds
      },
   },
})

export default userSlice.reducer
export const { changeUserState, attributeUserData } = userSlice.actions
export const getUserState = (state: RootState) => {
   return state.userState.auth
}
export const getUserData = (state: RootState) => {
   return state.userState.data
}
