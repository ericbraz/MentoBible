'use client' // temporary
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from '@/config/firebase'
import { signOut } from 'firebase/auth'

export default function UserDashboard() {
   const router = useRouter()

   async function logout() {
      try {
         await signOut(auth)
         router.push('/')
      } catch (error) {
         alert(error)
      }
   }

   useEffect(() => {
      console.log(auth?.currentUser?.email)
   }, [])

   return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
         <h2>Welcome</h2>
         <div>
            <Link href='/'>Home</Link>
         </div>
         <div>
            <button onClick={() => router.back()}>Come back</button>
         </div>
         <div>
            <button onClick={logout}>Logout</button>
         </div>
      </div>
   )
}
