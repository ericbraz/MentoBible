'use client'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function AdminSection() {
   const router = useRouter()

   useLayoutEffect(() => {
      router.push('/admin/home')
   }, [])

   return <></>
}
