'use client'
import useToastState from '@/hooks/useToastState'
import { Fragment, useEffect, useState } from 'react'
import { BsCheckCircle, BsInfoCircle, BsX, BsXCircle } from 'react-icons/bs'

type BgColors = 'bg-[#b6f8c4]' | 'bg-[#b2e6f5]' | 'bg-[#ffb7b7]'

export default function ToastNotification() {
   const { toastState } = useToastState()
   const { title, description, type, visibility } = toastState

   const [backgroundHex, setBackgroundHex] = useState<BgColors>('bg-[#b2e6f5]')
   useEffect(() => {
      type === 'success' && setBackgroundHex('bg-[#b6f8c4]')
      type === 'info' && setBackgroundHex('bg-[#b2e6f5]')
      type === 'error' && setBackgroundHex('bg-[#ffb7b7]')
   }, [type])

   const newTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()

   return (
      <div
         className={`${
            visibility ? 'flex items-center justify-center' : 'hidden'
         } fixed right-0 bottom-28 left-0 max-h-fit z-[1000]`}
      >
         <div
            className={`${backgroundHex} rounded-lg h-fit text-black fixed flex flex-row items-center justify-center px-5 py-3 gap-5`}
         >
            <div className='text-3xl'>
               {type === 'success' && <BsCheckCircle />}
               {type === 'info' && <BsInfoCircle />}
               {type === 'error' && <BsXCircle />}
            </div>
            <div className='flex flex-row justify-between gap-5'>
               <div>
                  <p className='font-bold'>{newTitle}</p>
                  <p>
                     {description.split('<br />').map((content, idx) => (
                        <Fragment key={content}>
                           {content}
                           {idx + 1 !== description.split('<br />').length && <br />}
                        </Fragment>
                     ))}
                  </p>
               </div>
               <div className='flex items-center justify-center text-2xl'>{/* <BsX /> */}</div>
            </div>
         </div>
      </div>
   )
}
