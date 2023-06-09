import AuthService from '@/service/AuthService'
import {
   changeUserState,
   getUserState,
   getUserData,
   attributeUserData,
} from '@/store/userState/userSlice'
import { FormattedUserState, userStateFormatter } from '@/utils/authUserHelper'
import { User as FirebaseUser } from 'firebase/auth'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function useUserState() {
   const dispatch = useDispatch()

   const userState = useSelector(getUserState)
   const setUserState = function (newUserState: FirebaseUser) {
      dispatch(changeUserState(userStateFormatter(newUserState)))
   }

   const userDataState = useSelector(getUserData)
   const setUserDataState = async function (currentUserState: FormattedUserState) {
      const id = currentUserState.userId
      if (id) {
         const newUserState = await AuthService.getUserData(id)
         newUserState && dispatch(attributeUserData(newUserState))
      }
   }

   useEffect(() => {
      const unsubscribe = AuthService.authStateListener(setUserState)

      return unsubscribe
   }, [])

   useEffect(() => {
      !userDataState.active && setUserDataState(userState)
   }, [userState])

   return { userDataState, userState, setUserState }
}
