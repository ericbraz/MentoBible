'use client'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

export default function LessonDisplayButton({
   children,
   className,
   active,
   href,
   onDivClick,
   onAnchorClick,
}: {
   children: React.ReactNode
   className?: string
   active?: boolean
   href?: Url
   onDivClick?: React.MouseEventHandler<HTMLDivElement>
   onAnchorClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
   return (
      <>
         {!href ? (
            !!active ? (
               <div
                  className={`bg-zinc-700 text-sky-100 hover:bg-sky-300 hover:text-zinc-800 rounded-full px-5 py-2 cursor-pointer transition-all duration-300 ${
                     className ?? ''
                  }`}
                  onClick={onDivClick}
               >
                  {children}
               </div>
            ) : (
               <div
                  className={`bg-sky-300 text-zinc-800 rounded-full px-5 py-2 cursor-pointer ${
                     className ?? ''
                  }`}
                  style={{ boxShadow: '0 0 5px rgb(125,211,252), 0 0 25px cyan' }}
                  onClick={onDivClick}
               >
                  {children}
               </div>
            )
         ) : (
            <Link
               className={`bg-zinc-700 text-sky-100 hover:bg-sky-300 hover:text-zinc-800 rounded-full px-5 py-2 cursor-pointer transition-all duration-300 ${
                  className ?? ''
               }`}
               href={href}
               onClick={onAnchorClick}
            >
               {children}
            </Link>
         )}
      </>
   )
}
