'use client'
import useToastState from '@/hooks/useToastState'
import { ColorRing } from 'react-loader-spinner'

export default function LoaderComponent() {
   const { toastState, turnToastOff } = useToastState()
   const { type, visibility } = toastState

   return (
      <div
         className={`fixed left-0 top-0 ${
            visibility && type === 'loader' ? 'flex items-center justify-center' : 'hidden'
         } bg-[rgba(0,0,0,0.8)] w-screen h-screen z-50`}
      >
         <ColorRing
            height={150}
            width={150}
            colors={['#36d7b7', '#36d7b7', '#36d7b7', '#36d7b7', '#36d7b7']}
         />
      </div>
   )
}
