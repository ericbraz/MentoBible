import AuthService from '@/service/AuthService'
import { ReduxUserState, changeUserState, getUserState } from '@/store/userState/userSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function useUserState() {
   const userState = useSelector(getUserState)
   const dispatch = useDispatch()

   const setUserState = function (newUserState: ReduxUserState['data']) {
      dispatch(changeUserState(newUserState))
   }

   useEffect(() => {
      const unsubscribe = AuthService.authStateListener(setUserState)

      return unsubscribe
   }, [])

   return { userState, setUserState }
}
