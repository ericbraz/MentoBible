import { TOAST_MESSAGE } from '@/constants/tempToastMessage'
import useToastState from '@/hooks/useToastState'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminNavigationLink({
   href,
   children,
}: {
   href?: Url
   children: React.ReactNode
}) {
   const pathname = usePathname()

   const { setToastState } = useToastState()

   if (!href) {
      return (
         <div
            className={`flex flex-row gap-3 line-clamp-5 py-3 px-2 pl-5 cursor-pointer hover:bg-slate-700 text-slate-400 hover:text-white`}
            onClick={() => setToastState(TOAST_MESSAGE)}
         >
            {children}
         </div>
      )
   }

   return (
      <Link href={href}>
         <div
            className={`flex flex-row gap-3 line-clamp-5 py-3 px-2 pl-5 cursor-pointer ${
               pathname === href
                  ? ' bg-slate-700 text-white'
                  : 'hover:bg-slate-700 text-slate-400 hover:text-white'
            }`}
         >
            {children}
         </div>
      </Link>
   )
}
