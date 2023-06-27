import { useEffect, useState } from 'react'
import { possibleBanners } from '@/app/(dashboard)/dashboard/imageArray'
import Image from 'next/image'

export default function Banner() {
   const [index, setIndex] = useState(0)
   useEffect(() => {
      possibleBanners.length > 1 &&
         setTimeout(() => {
            const nextIndex = index + 1 > possibleBanners.length - 1 ? 0 : index + 1
            setIndex(nextIndex)
         }, 10000)
   }, [index])

   return (
      <div>
         {possibleBanners.map((image, idx) => (
            <div
               key={image.alt}
               className={`${
                  index === idx ? 'block bg-opacity-1' : 'hidden bg-opacity-0'
               } transition duration-300 relative top-0 left-0 right-0 w-screen h-[500px]`}
            >
               <Image src={image.img} alt={image.alt} className='object-cover' fill priority />
               <div className='top-image-gradient absolute top-0 left-0 right-0 flex flex-col justify-center w-screen h-[500px] px-12 sm:px-36 lg:px-52'>
                  <h1 className='text-2xl 550:text-4xl font-semibold 550:font-bold text-slate-200 mb-4'>
                     {image.title}
                  </h1>
                  <p className='max-w-xl text-slate-200 text-sm 550:text-base'>{image.text}</p>
                  <button className='bg-sky-400 hover:bg-slate-300 text-zinc-900 font-semibold mt-16 text-sm 550:text-base py-2 550:py-3 px-4 550:px-7 max-w-fit rounded-lg transition duration-300'>
                     {image.CTA.toUpperCase()}
                  </button>
               </div>
            </div>
         ))}
      </div>
   )
}
