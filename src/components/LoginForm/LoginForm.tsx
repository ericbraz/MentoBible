'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi'
import Link from 'next/link'
import InputField from '../book/verse/InputField'
import InputSubmit from '../book/verse/InputSubmit'
import useUserState from '@/hooks/useUserState'
import AuthService from '@/service/AuthService'
import { userStateFormatter } from '@/utils/authUserHelper'

export default function LoginForm() {
   const router = useRouter()

   const [email, setEmail] = useState('')
   const [pass, setPass] = useState('')

   const { setUserState } = useUserState()

   async function signIn(email: string, password: string) {
      const user = (await AuthService.signIn(email, password)) || null
      if (user) {
         setUserState(userStateFormatter(user))
         router.push('/dashboard')
      }
   }

   return (
      <>
         <div className='top-header'>
            <span className='text-sm flex justify-center py-3 px-0'>
               <Link
                  href='/signup'
                  className='text-sky-400 hover:text-slate-300 visited:text-purple-300 underline'
               >
                  Ainda não possui uma conta?
               </Link>
            </span>
            <header className='text-[30px] flex justify-center py-3 px-0'>Login</header>
         </div>

         <form
            onSubmit={(event) => {
               event.preventDefault()
               signIn(email, pass)
            }}
         >
            <InputField
               type='text'
               placeholder='E-mail'
               value={email}
               onChange={(event) => setEmail(event.target.value)}
               required
            >
               <HiOutlineUser />
            </InputField>
            <InputField
               type='password'
               placeholder='Senha'
               value={pass}
               onChange={(event) => setPass(event.target.value)}
               required
            >
               <HiOutlineLockClosed />
            </InputField>
            <InputSubmit value='Login' />
         </form>

         <div className='bottom flex flex-row justify-between text-sm mt-3'>
            <div className='left flex'></div>
            <div className='right'>
               <label>
                  <Link
                     href='/request-reset-password'
                     className='text-sky-400 hover:text-slate-300 visited:text-purple-300 underline'
                  >
                     Esqueceu a senha?
                  </Link>
               </label>
            </div>
         </div>
      </>
   )
}
