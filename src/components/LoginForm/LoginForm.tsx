'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi'
import Link from 'next/link'
import InputField from '../book/verse/InputField'
import InputSubmit from '../book/verse/InputSubmit'

export default function LoginForm() {
   const router = useRouter()

   const [email, setEmail] = useState('')
   const [pass, setPass] = useState('')

   return (
      <>
         <div className='top-header'>
            <span className='text-sm flex justify-center py-3 px-0'>
               <Link href='/signup'>Ainda não possui uma conta?</Link>
            </span>
            <header className='text-[30px] flex justify-center py-3 px-0'>Login</header>
         </div>

         <form
            onSubmit={(event) => {
               event.preventDefault()
               router.push('/dashboard')
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
            <div className='left flex'>
               <input type='checkbox' id='check' />
               <label htmlFor='check'>Lembre-me</label>
            </div>
            <div className='right'>
               <label>
                  <Link href='/user-dashboard' className='no-underline'>
                     Esqueceu a senha?
                  </Link>
               </label>
            </div>
         </div>
      </>
   )
}
