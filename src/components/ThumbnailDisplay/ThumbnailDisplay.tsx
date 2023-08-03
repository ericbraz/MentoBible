'use client'
import { COURSE_STATUS_COMPONENTS } from '@/constants/data'
import { DEFAULT_COURSE_THUMBNAIL } from '@/constants/firebase'
import { CourseCreationType } from '@/models/interfaces'
import Image from 'next/image'
import { useState, useRef, useEffect, Fragment } from 'react'

export default function ThumbnailDisplay({
   src,
   alt,
   className,
   text,
   activation,
   priority,
}: {
   src: string | undefined
   alt: string
   className?: string
   text?: string
   activation?: CourseCreationType | 'courseless'
   priority?: boolean
}) {
   const [containerHeight, setContainerHeight] = useState(0)
   const containerRef = useRef<HTMLDivElement>(null)
   useEffect(() => {
      const handleResize = () => {
         if (containerRef.current) {
            setContainerHeight(containerRef.current.clientHeight)
         }
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   const [isSpanFullHeight, setIsSpanFullHeight] = useState(false)

   const [displayMsg, setDisplayMsg] = useState(false)

   return (
      <div
         ref={containerRef}
         className={`relative rounded-md ${className ?? ''}`}
         style={{
            width: `${containerHeight * 0.5625}px`,
            height: '100%',
         }}
         onMouseEnter={() => setIsSpanFullHeight(true)}
         onMouseLeave={() => setIsSpanFullHeight(false)}
      >
         <Image
            src={!!src ? src : DEFAULT_COURSE_THUMBNAIL}
            alt={alt}
            fill
            priority={priority}
            className='rounded-md'
         />
         {text && (
            <div
               className={`absolute flex flex-row items-end ${
                  !!activation ? 'justify-between' : 'justify-end'
               } bottom-0 text-white bg-gradient-to-t from-slate-900 via-slate-950-80 to-transparent rounded-md font-semibold p-3 ${
                  !isSpanFullHeight ? 'h-[40%]' : 'h-full'
               } transition-all duration-1000`}
            >
               <span>{text}</span>
               {!!activation && (
                  <span
                     onMouseEnter={() => setDisplayMsg(true)}
                     onMouseLeave={() => setDisplayMsg(false)}
                  >
                     {COURSE_STATUS_COMPONENTS.filter((comp) => comp.activation === activation).map(
                        (comp) => (
                           <Fragment key={comp.activation}>
                              {comp.component}
                              <div
                                 className={`absolute ${
                                    displayMsg ? 'flex justify-center items-center' : 'hidden'
                                 } bg-white text-black rounded-lg border-2 p-5 w-fit h-fit z-[1]`}
                              >
                                 {comp.text.replace(/\s/g, '\u00A0')}
                              </div>
                           </Fragment>
                        )
                     )}
                  </span>
               )}
            </div>
         )}
      </div>
   )
}
