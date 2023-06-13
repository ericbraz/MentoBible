'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function UserParamsPage() {
   const router = useRouter()

   const params = useSearchParams()
   const mode = params.get('mode')
   const oobCode = params.get('oobCode')
   const apiKey = params.get('apiKey')
   const lang = params.get('lang')

   useEffect(() => {
      if (mode === 'resetPassword' && oobCode && apiKey && lang) {
         router.push(
            `/reset-password?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`
         )
      } else if (mode === 'verifyEmail' && oobCode && apiKey && lang) {
         router.push(
            `/email-confirmation?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`
         )
      } else {
         router.push('/login')
      }
   }, [])

   return (
      <div className='absolute top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center text-center text-white h-screen w-screen'>
         Aguarde que você será redirecionado
      </div>
   )
}
