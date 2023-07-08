'use client'
import { usePathname, useRouter } from 'next/navigation'
import useAccessSystems from '@/hooks/useAccessSystems'
import { useEffect, useState } from 'react'
import useUserState from '@/hooks/useUserState'

export default function AdminPrivateRoute({ children }: { children: React.ReactNode }) {
   const { push } = useRouter()

   const pathname = usePathname()

   const { userState } = useUserState()
   const { userId } = userState

   const [isLoading, setIsLoading] = useState(true)

   const { accessibleSystemsObject, accessibleSystemsList } = useAccessSystems()
   const isUserAuthorized =
      accessibleSystemsList[0] === '' ||
      !accessibleSystemsList.some((system) => pathname.includes(system))

   useEffect(() => {
      if (!userId && !isLoading) {
         push('/login')
      } else if (isUserAuthorized && !isLoading) {
         push('/dashboard')
      }

      setIsLoading(!isLoading)
   }, [accessibleSystemsObject[0]])

   return (
      <>
         {!userId && isUserAuthorized && null}
         {userId && !isUserAuthorized && children}
      </>
   )
}
