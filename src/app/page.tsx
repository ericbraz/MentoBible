'use client'
import { useLayoutEffect } from 'react'
import FormPagesLayout from '@/components/FormPagesLayout'
import { useRouter } from 'next/navigation'

export default function Home() {
   const router = useRouter()

   useLayoutEffect(() => {
      router.push('/login')
   }, [])

   return (
      <FormPagesLayout>
         <div></div>
      </FormPagesLayout>
   )
}
