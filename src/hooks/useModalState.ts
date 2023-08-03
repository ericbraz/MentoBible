import { FunctionalModalObject, changeModalState, getModalState } from '@/store/modalSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function useModalState() {
   const modalState = useSelector(getModalState)
   const dispatch = useDispatch()

   function setModalState(data: Omit<FunctionalModalObject, 'visibility'>) {
      dispatch(changeModalState({ ...data, visibility: true }))
   }

   function setModalStateOut() {
      dispatch(
         changeModalState({
            text: '',
            leftButtonText: '',
            rightButtonText: '',
            onClick: async () => {},
            visibility: false,
         })
      )
   }

   return { modalState, setModalState, setModalStateOut }
}
