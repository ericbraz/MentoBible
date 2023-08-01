import { DEFAULT_PROFILE_IMAGE } from '@/constants/firebase'
import AuthService from '@/service/AuthService'
import {
   changeUserState,
   getUserState,
   getUserData,
   attributeUserData,
} from '@/store/userState/userSlice'
import { FormattedUserState, userStateFormatter } from '@/utils/authUserHelper'
import { User as FirebaseUser } from 'firebase/auth'
import { useState, useEffect } from 'react'
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
      await updateUserById(id)
   }
   const setUserDataStateById = async function (id: string) {
      await updateUserById(id)
   }
   const updateUserDataState = async function () {
      await setUserDataState(userState)
   }

   useEffect(() => {
      const unsubscribe = AuthService.authStateListener(setUserState)

      return unsubscribe
   }, [])

   useEffect(() => {
      !userDataState.active && setUserDataState(userState)
   }, [userState])

   const [userPhoto, setUserPhoto] = useState(userDataState.photoURL ?? DEFAULT_PROFILE_IMAGE)
   useEffect(() => {
      setUserPhoto(userDataState.photoURL ?? DEFAULT_PROFILE_IMAGE)
   }, [userDataState])

   async function updateUserById(id?: string | null) {
      if (id) {
         const newUserState = await AuthService.getUserData(id)
         newUserState && dispatch(attributeUserData(newUserState))
      }
   }

   return {
      userPhoto,
      userState,
      setUserState,
      userDataState,
      updateUserDataState,
      setUserDataStateById,
   }
}
