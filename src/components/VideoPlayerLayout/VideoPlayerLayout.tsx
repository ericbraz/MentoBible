'use client'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'

export default function VideoPlayerLayout({
   videoUrl,
   className,
}: {
   videoUrl: string
   className?: string
}) {
   const [containerWidth, setContainerWidth] = useState(0)
   const containerRef = useRef<HTMLDivElement>(null)
   useEffect(() => {
      const handleResize = () => {
         if (containerRef.current) {
            setContainerWidth(containerRef.current.clientWidth)
         }
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   return (
      <div
         ref={containerRef}
         className={className}
         style={{
            width: '100%',
            height: `${containerWidth * 0.5625}px`,
         }}
      >
         {containerRef && (
            <ReactPlayer url={videoUrl} controls={true} light={true} width='100%' height='100%' />
         )}
      </div>
   )
}
