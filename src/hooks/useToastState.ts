import { ReduxToastState, changeToastState, getToastState } from '@/store/toastSlice'
import { useDispatch, useSelector } from 'react-redux'

const DEFAULT_TIMER = 8000

export default function useToastState() {
   const toastState = useSelector(getToastState)
   const dispatch = useDispatch()

   function setToastState(data: Omit<ReduxToastState, 'visibility'>, timer?: number) {
      dispatch(changeToastState({ ...data, visibility: true }))

      setTimeout(
         () =>
            dispatch(
               changeToastState({
                  title: '',
                  description: '',
                  type: 'info',
                  visibility: false,
               })
            ),
         timer ?? DEFAULT_TIMER
      )
   }

   function turnToastOff() {
      dispatch(
         changeToastState({
            title: '',
            description: '',
            type: 'info',
            visibility: false,
         })
      )
   }

   function turnLoaderToastOn() {
      setToastState({
         title: '',
         description: '',
         type: 'loader',
      })
   }

   return { toastState, setToastState, turnToastOff, turnLoaderToastOn }
}
