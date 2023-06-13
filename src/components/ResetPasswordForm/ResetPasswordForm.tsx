'use client'
import { useState } from 'react'
import { HiOutlineLockClosed } from 'react-icons/hi'
import InputField from '../book/verse/InputField'
import InputSubmit from '../book/verse/InputSubmit'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthService from '@/service/AuthService'
import { confirmPasswordReset } from 'firebase/auth'
import { auth } from '@/config/firebase'

export default function ResetPasswordForm() {
   const router = useRouter()
   const params = useSearchParams()

   const [formValues, setFormValues] = useState({
      password: '',
      confirmPassword: '',
   })
   function handleEvent(event: React.ChangeEvent<HTMLInputElement>) {
      setFormValues({ ...formValues, [event.target.name]: [event.target.value] })
   }

   async function resetPassword() {
      const oobCode = params.get('oobCode')

      if (oobCode) {
         try {
            AuthService.checkPassword(formValues)
            await confirmPasswordReset(auth, oobCode, formValues.password[0])
            router.push('/login')
         } catch (error) {
            alert('Erro em reset form')
            alert(error)
         }
      }
   }

   return (
      <>
         <div className='top-header'>
            <header className='text-[26px] flex justify-center py-3 px-0'>
               Cadastre a nova senha
            </header>
         </div>

         <form
            onSubmit={(event) => {
               event.preventDefault()
               resetPassword()
            }}
         >
            <InputField
               type='password'
               placeholder='Senha'
               name='password'
               value={formValues.password}
               onChange={handleEvent}
               required
            >
               <HiOutlineLockClosed />
            </InputField>
            <InputField
               type='password'
               placeholder='Confirmar Senha'
               name='confirmPassword'
               value={formValues.confirmPassword}
               onChange={handleEvent}
               required
            >
               <HiOutlineLockClosed />
            </InputField>

            <InputSubmit value='Cadastrar senha' />
         </form>

         <div className='bottom flex flex-row justify-between text-sm mt-3'>
            <div className='right'>
               <button
                  onClick={() => router.back()}
                  className='text-[#2200cc] hover:text-slate-800 visited:text-purple-800 underline'
               >
                  Voltar
               </button>
            </div>
         </div>
      </>
   )
}
