'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useUserState from '@/hooks/useUserState'
import AuthService from '@/service/AuthService'

export default function UserDashboard() {
   const router = useRouter()
   async function logout() {
      await AuthService.signOut()
      router.push('/')
   }

   const { userState } = useUserState()
   const [userName, setUserName] = useState<string | null>(null)
   useEffect(() => {
      userState && setUserName(userState.email)
   }, [userState])

   return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
         <h2>Bem-vindo</h2>
         <div>
            <Link href='/'>Ir para a Home</Link>
         </div>
         {userName && <div>{userName}</div>}
         <div>
            <button onClick={() => router.back()}>Voltar</button>
         </div>
         <div>
            <button onClick={logout}>Sair</button>
         </div>
      </div>
   )
}
