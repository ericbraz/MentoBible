'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function LightBulb({ className }: { className?: string }) {
   const [containerWidth, setContainerWidth] = useState(0)
   const [containerHeight, setContainerHeight] = useState(0)
   const containerRef = useRef<HTMLDivElement>(null)
   useEffect(() => {
      const handleResize = () => {
         if (containerRef.current) {
            setContainerWidth(containerRef.current.clientWidth)
            setContainerHeight(containerRef.current.clientHeight)
         }
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   const MULTIPLIER = 0.45

   return (
      <div ref={containerRef} className={`relative w-fit h-fit ${className ?? ''}`}>
         {containerRef && (
            <>
               <Image
                  src='/light-bulb.png'
                  alt='Light Bulb'
                  width={604}
                  height={960}
                  className='relative z-[3]'
                  priority
               />
               <div
                  className='absolute w-12 h-12 rounded-full bg-yellow-300 z-[2]'
                  style={{
                     width: `${containerWidth * MULTIPLIER}px`,
                     height: `${containerWidth * MULTIPLIER}px`,
                     left: `${containerWidth / 2 - (containerWidth * MULTIPLIER) / 2}px`,
                     top: `${(containerHeight * 3) / 4 - (containerWidth * MULTIPLIER) / 2}px`,
                     boxShadow:
                        '0 0 15px rgba(253, 224, 71, 1), 0 0 15px rgba(253, 224, 71, 0.8), 0 0 20px rgba(253, 224, 71, 0.8), 0 0 20px rgba(253, 224, 71, 0.8), 0 0 30px rgba(253, 224, 71, 0.8), 0 0 30px rgba(253, 224, 71, 0.8), 0 0 40px rgba(253, 224, 71, 0.8), 0 0 40px rgba(253, 224, 71, 0.8), 0 0 50px rgba(253, 224, 71, 0.8), 0 0 50px rgba(253, 224, 71, 0.8), 0 0 60px rgba(253, 224, 71, 0.8), 0 0 70px rgba(253, 224, 71, 0.8), 0 0 80px rgba(253, 224, 71, 0.8), 0 0 90px rgba(253, 224, 71, 0.8), 0 0 100px rgba(253, 224, 71, 0.8), 0 0 110px rgba(253, 224, 71, 0.8), 0 0 120px rgba(253, 224, 71, 0.8), 0 0 130px rgba(253, 224, 71, 0.8), 0 0 140px rgba(253, 224, 71, 0.8), 0 0 150px rgba(253, 224, 71, 0.8), 0 0 160px rgba(253, 224, 71, 0.8), 0 0 170px rgba(253, 224, 71, 0.8), 0 0 180px rgba(253, 224, 71, 0.8), 0 0 190px rgba(253, 224, 71, 0.8), 0 0 200px rgba(253, 224, 71, 0.8)',
                  }}
               ></div>
            </>
         )}
      </div>
   )
}
