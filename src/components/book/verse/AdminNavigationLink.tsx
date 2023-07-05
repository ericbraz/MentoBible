import { TOAST_MESSAGE } from '@/constants/tempToastMessage'
import useToastState from '@/hooks/useToastState'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ImBlocked } from 'react-icons/im'

export default function AdminNavigationLink({
   href,
   children,
   sublinks,
}: {
   href?: Url
   children: React.ReactNode
   sublinks?: {
      title: string
      url: Url
   }[]
}) {
   const pathname = usePathname()

   const { setToastState } = useToastState()

   if (!href) {
      return (
         <div
            className={`flex flex-row gap-3 line-clamp-5 py-3 px-2 pl-5 cursor-pointer hover:bg-slate-700 text-slate-400 hover:text-white line-through`}
            onClick={() => setToastState(TOAST_MESSAGE)}
         >
            {children} <ImBlocked size={21} />
         </div>
      )
   }

   return (
      <div>
         <Link href={href}>
            <div
               className={`flex flex-row gap-3 line-clamp-5 py-3 px-2 pl-5 cursor-pointer ${
                  pathname.includes(href as string)
                     ? ' bg-slate-600 text-white border-t border-b border-cyan-300'
                     : 'hover:bg-slate-700 text-slate-400 hover:text-white'
               }`}
            >
               {children}
            </div>
         </Link>
         {pathname.includes(href as string) &&
            sublinks?.map((link) => (
               <Link key={link.title} href={link.url}>
                  <div
                     className={`py-3 px-2 pl-8 ${
                        pathname === link.url
                           ? ' bg-slate-700 text-white'
                           : 'hover:bg-slate-700 text-slate-400 hover:text-white'
                     }`}
                  >
                     {link.title}
                  </div>
               </Link>
            ))}
      </div>
   )
}
