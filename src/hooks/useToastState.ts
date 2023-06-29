import { ReduxToastState, changeToastState, getToastState } from '@/store/toastSlice'
import { useDispatch, useSelector } from 'react-redux'

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
         timer ?? 8000
      )
   }

   return { toastState, setToastState }
}
