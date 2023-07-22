'use cliente'
import Image from 'next/image'
import { useState } from 'react'
import { BsCameraFill } from 'react-icons/bs'
import InputField from './InputField'
import { DEFAULT_PROFILE_IMAGE } from '@/constants/firebase'

export default function AvatarProfilePicture({
   className,
   onClick,
   picValue,
   onChange,
}: {
   className?: string
   onClick?: React.MouseEventHandler<SVGElement>
   picValue?: string
   onChange?: (
      event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
   ) => void
}) {
   const [visibility, setVisibility] = useState(false)

   const uploader = !!onChange || !!onClick

   return (
      <div
         className='relative flex justify-center items-center rounded-full w-fit h-fit overflow-hidden'
         onMouseOver={() => setVisibility(uploader ?? false)}
         onMouseLeave={() => setVisibility(false)}
      >
         <div className='w-80 h-80'>
            <Image
               src={picValue ?? DEFAULT_PROFILE_IMAGE}
               alt='User Avatar'
               fill
               className={`object-cover rounded-full ${uploader ? ' cursor-pointer' : ''} ${
                  className ?? ''
               }`}
            />
         </div>
         <div
            className={`absolute ${
               visibility ? 'block' : 'hidden'
            } hover:block rounded-full w-full h-full`}
         >
            <div className='w-full h-3/4'></div>
            <div className='flex justify-center items-center bottom-0 w-full h-1/4 bg-[rgba(0,0,0,0.7)]'>
               {!!onChange ? (
                  <>
                     <label htmlFor='imageInput'>
                        <BsCameraFill color='white' size={30} className='cursor-pointer' />
                     </label>
                     <InputField
                        type='file'
                        value=''
                        onChange={onChange}
                        id='imageInput'
                        className='hidden'
                        accept='.jpg,.jpeg,.png'
                     />
                  </>
               ) : (
                  <BsCameraFill
                     color='white'
                     size={30}
                     className='cursor-pointer'
                     onClick={onClick}
                  />
               )}
            </div>
         </div>
      </div>
   )
}
