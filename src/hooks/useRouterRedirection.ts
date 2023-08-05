import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useRouterRedirection<T>(
   func: () => boolean,
   dependency: T[] | null | undefined,
   page: string
) {
   const { push } = useRouter()
   const isComponentUnmounted = useRef(false)
   const redirectFunc = useCallback(func, [dependency])

   /*
    * The useState prevents the redirection in the first render before
    * the dependency has possibly a truthy value attributed to it.
    */
   const [isInitialRender, setIsInitialRender] = useState(true)
   useEffect(() => {
      console.log('test')
      if (isInitialRender && !isComponentUnmounted.current) {
         setIsInitialRender(false)
         return
      }

      const userWillBeRedirected = redirectFunc()
      if (userWillBeRedirected) {
         push(page)
      }

      return () => {
         // If component is unmounting it will prevent the redirection
         isComponentUnmounted.current = true
      }
   }, [dependency])
}
