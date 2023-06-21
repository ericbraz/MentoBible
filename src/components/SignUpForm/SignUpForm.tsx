'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'
import InputField from '../book/verse/InputField'
import InputSubmit from '../book/verse/InputSubmit'
import AuthService from '@/service/AuthService'

export default function SignUpForm() {
   const [formValues, setFormValues] = useState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
   })
   function handleEvent(event: React.ChangeEvent<HTMLInputElement>) {
      setFormValues({ ...formValues, [event.target.name]: [event.target.value] })
   }

   const router = useRouter()
   async function signUpValidation() {
      const validated = await AuthService.signUpValidation(formValues)
      validated && router.push('/email-verification')
   }

   return (
      <>
         <div className='top-header'>
            <header className='text-[30px] flex justify-center py-3 px-0'>Cadastrar</header>
         </div>

         <form
            onSubmit={(event) => {
               event.preventDefault()
               signUpValidation()
            }}
         >
            <InputField
               type='firstName'
               placeholder='Nome'
               name='firstName'
               value={formValues.firstName}
               onChange={handleEvent}
               required
            >
               <HiOutlineUser />
            </InputField>
            <InputField
               type='lastName'
               placeholder='Sobrenome'
               name='lastName'
               value={formValues.lastName}
               onChange={handleEvent}
               required
            >
               <HiOutlineUser />
            </InputField>
            <InputField
               type='email'
               placeholder='E-mail'
               name='email'
               value={formValues.email}
               onChange={handleEvent}
               required
            >
               <HiOutlineMail />
            </InputField>
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
            <InputSubmit value='Cadastrar' />
         </form>

         <div className='bottom flex flex-row justify-between text-sm mt-3'>
            <div className='right'>
               <button
                  onClick={() => router.back()}
                  className='text-sky-400 hover:text-slate-300 visited:text-purple-300 underline'
               >
                  Voltar
               </button>
            </div>
         </div>
      </>
   )
}
