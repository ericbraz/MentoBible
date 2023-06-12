'use client'
import { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import InputField from '../book/verse/InputField'
import InputSubmit from '../book/verse/InputSubmit'
import { useRouter } from 'next/navigation'
import AuthService from '@/service/AuthService'

export default function RequestResetPasswordForm() {
   const router = useRouter()

   const [email, setEmail] = useState('')

   async function requestResetPassword() {
      const validated = await AuthService.requestResetPassword(email)
      validated && router.push('/email-reset-password')
   }

   return (
      <>
         <div className='top-header'>
            <header className='text-[26px] flex justify-center py-3 px-0'>
               Esqueceu sua senha?
            </header>
         </div>

         <div className='flex items-center justify-center'>
            <p className='w-fit pb-4'>Informe seu e-mail de cadastro</p>
         </div>

         <form
            onSubmit={(event) => {
               event.preventDefault()
               requestResetPassword()
            }}
         >
            <InputField
               type='email'
               placeholder='E-mail'
               name='email'
               value={email}
               onChange={(event) => setEmail(event.target.value)}
               required
            >
               <HiOutlineMail />
            </InputField>

            <InputSubmit value='Resetar senha' />
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
