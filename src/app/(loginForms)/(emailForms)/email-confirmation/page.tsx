'use client'
import { auth } from '@/config/firebase'
import { applyActionCode } from 'firebase/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function EmailConfirmationPage() {
   const router = useRouter()

   const oobCode = useSearchParams().get('oobCode')

   async function emailConfirmation(confirmationCode: string | null) {
      if (confirmationCode) {
         try {
            await applyActionCode(auth, confirmationCode)
         } catch (error) {
            alert(error)
            router.push('/login')
         }
      } else {
         router.push('/login')
      }
   }

   useEffect(() => {
      emailConfirmation(oobCode)
   }, [])

   return (
      <>
         Seu <>e-mail</> foi confirmado. Agora você já pode acessar o Mento Bible.
      </>
   )
}
