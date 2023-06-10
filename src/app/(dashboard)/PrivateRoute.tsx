'use client'
import { useEffect, useState } from 'react'
import useUserState from '@/hooks/useUserState'
import { useRouter } from 'next/navigation'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
   const { push } = useRouter()

   const { userState } = useUserState()
   const { userId } = userState

   const [isLoading, setIsLoading] = useState(true)
   useEffect(() => {
      if (!userId && !isLoading) {
         push('/login')
      }
      setIsLoading(!isLoading)
   }, [userState])

   return (
      <>
         {!userId && null}
         {userId && children}
      </>
   )
}
