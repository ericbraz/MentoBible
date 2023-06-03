'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'
import { auth } from '@/config/firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'
import UserModel from '@/models/UserModel'
import InputField from '../book/verse/InputField'
import InputSubmit from '../book/verse/InputSubmit'

export default function SignUpForm() {
   const router = useRouter()

   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
   const passRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]).{8,}$/
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

   async function signInValidation() {
      const { firstName, lastName, email, password, confirmPassword } = formValues

      try {
         if (!emailRegex.test(email)) throw new Error('Invalid email')
         if (!passRegex.test(password))
            throw new Error(
               'Password must contain at least 8 characters and:\n\u00A0\u00A01 upper case letter A-Z\n\u00A0\u00A01 lower case letter a-z\n\u00A0\u00A01 number\n\u00A0\u00A01 special character: !@#$%^&*()_+-=[ ]{};\':"\\|,.<>/?'
            )
         if (password[0] !== confirmPassword[0]) throw new Error('Passwords must match')

         const credentials = await createUserWithEmailAndPassword(auth, email[0], password[0])
         const firebaseUser = credentials.user
         const user = new UserModel({
            id: firebaseUser.uid,
            firstName: firstName[0],
            lastName: lastName[0],
            email: firebaseUser.email as string,
         })
         await sendEmailVerification(firebaseUser)
         await user.save()

         await signOut(auth)
         router.push('/signup/email-verification')
      } catch (error) {
         alert(error)
      }
   }

   return (
      <>
         <div className='top-header'>
            <header className='text-[30px] flex justify-center py-3 px-0'>Cadastrar</header>
         </div>

         <form
            onSubmit={(event) => {
               event.preventDefault()
               signInValidation()
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
               <button onClick={() => router.back()}>Voltar</button>
            </div>
         </div>
      </>
   )
}
