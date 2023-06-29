import { ReduxToastState } from '@/store/toastSlice'

export const TOAST_MESSAGE = {
   title: 'Ops!',
   description: 'Parece que esse link/botão não está funcionando. <br />Aguarde novas atualizações.',
   type: 'info' as 'success' | 'info' | 'error',
} as ReduxToastState
