import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import {
   FormattedUserState,
   systemStateData,
   userStateData,
   userStateFormatter,
} from '@/utils/authUserHelper'
import { System, User } from '@/models/interfaces'

export interface ReduxUserState {
   auth: FormattedUserState
   data: User
   systems: System[]
   systemsList: string[]
}
const initialState: ReduxUserState = {
   auth: userStateFormatter(null),
   data: userStateData(null),
   systems: systemStateData(null),
   systemsList: [],
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
      findUserSystems: (state, { payload }: PayloadAction<System[]>) => {
         state.systems = payload
      },
      listSystems: (state, { payload }: PayloadAction<ReduxUserState['systemsList']>) => {
         state.systemsList = payload
      },
   },
})

export default userSlice.reducer
export const { changeUserState, attributeUserData, findUserSystems, listSystems } =
   userSlice.actions
export const getUserState = (state: RootState) => {
   return state.userState.auth
}
export const getUserData = (state: RootState) => {
   return state.userState.data
}
export const getSystemData = (state: RootState) => {
   return state.userState.systems
}
export const getSystemsList = (state: RootState) => {
   return state.userState.systemsList
}
