import { useState, useEffect } from 'react'

interface WindowDimensions {
   width: number
   height: number
}

function getWindowDimensions() {
   if (typeof window === 'undefined') return { width: 0, height: 0 } as WindowDimensions

   const { innerWidth: width, innerHeight: height } = window
   return {
      width,
      height,
   } as WindowDimensions
}

export default function useWindowDimensions(): WindowDimensions {
   const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
      width: 700,
      height: 700,
   } as WindowDimensions)

   useEffect(() => {
      setWindowDimensions(getWindowDimensions())
      function handleResize() {
         setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   return windowDimensions
}
