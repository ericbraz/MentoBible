'use client'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '../verse/Logo'
import {
   BsSearch,
   BsBell,
   BsPerson,
   BsFillPersonVcardFill,
   BsBoxArrowLeft,
   BsClipboard2DataFill,
   BsFillHouseDoorFill,
   BsListCheck,
} from 'react-icons/bs'
import { useEffect, useState } from 'react'
import AuthService from '@/service/AuthService'
import useDifferentScreens from '@/hooks/useDifferentScreens'
import useToastState from '@/hooks/useToastState'
import { TOAST_MESSAGE } from '@/constants/tempToastMessage'

export default function TopNavbar() {
   const pathname = usePathname()

   const [bgClass, setBgClass] = useState<'bg-[#292423]' | ''>('')
   useEffect(() => {
      window.addEventListener('scroll', () => {
         if (window.scrollY >= 30) setBgClass('bg-[#292423]')
         else setBgClass('')
      })
   }, [])

   const [profileMenu, setProfileMenu] = useState(false)

   const router = useRouter()
   async function logout() {
      await AuthService.signOut()
      router.push('/')
   }

   const { smallerScreens } = useDifferentScreens()

   const { setToastState } = useToastState()

   return (
      <header
         className={`fixed top-0 flex items-center justify-between gap-12 py-4 px-12 lg:px-24 h-20 w-screen transition-colors duration-[600ms] z-10 ${bgClass}`}
      >
         <div>
            <Logo />
         </div>
         <nav className='hidden 550:flex 550:flex-1 550:gap-5 font-medium'>
            <div
               className={`flex flex-row hover:underline cursor-pointer ${
                  pathname === '/dashboard' ? 'text-sky-400' : 'text-slate-300'
               }`}
               onClick={() => setToastState(TOAST_MESSAGE)}
            >
               Início {/* dashboard */}
            </div>{' '}
            <div
               className={`flex flex-row hover:underline cursor-pointer ${
                  pathname === '/courses' ? 'text-sky-400' : 'text-slate-300'
               }`}
               onClick={() => setToastState(TOAST_MESSAGE)}
            >
               Lista de aulas {/* courses */}
            </div>{' '}
         </nav>
         <nav className='flex flex-row gap-4 h-10'>
            <BsSearch
               className='text-neutral-300 cursor-pointer p-2 rounded-full h-full w-10 hover:bg-slate-900'
               onClick={() => setToastState(TOAST_MESSAGE)}
            />
            <BsBell
               className='text-neutral-300 cursor-pointer p-2 rounded-full h-full w-10 hover:bg-slate-900'
               onClick={() => setToastState(TOAST_MESSAGE)}
            />
            <div
               className='relative active:bg-slate-900 840:hover:bg-slate-900 rounded-t-lg'
               onMouseEnter={() => !smallerScreens && setProfileMenu(true)}
               onMouseLeave={() => !smallerScreens && setProfileMenu(false)}
               onClick={() => {
                  smallerScreens && setProfileMenu(!profileMenu)
               }}
            >
               <BsPerson className='text-neutral-300 cursor-pointer p-2 rounded-t-lg h-full w-10' />
               <div
                  className={`${
                     profileMenu ? 'flex flex-col' : 'hidden'
                  } absolute top-10 right-0 py-2 w-60 h-fit bg-slate-900 text-white rounded-b-lg rounded-l-lg`}
               >
                  <div
                     className='550:hidden flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black'
                     onClick={() => setToastState(TOAST_MESSAGE)}
                  >
                     <BsFillHouseDoorFill /> Início
                  </div>
                  <div
                     className='550:hidden flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black'
                     onClick={() => setToastState(TOAST_MESSAGE)}
                  >
                     <BsListCheck /> Lista de aulas
                  </div>
                  <div
                     className='flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black'
                     onClick={() => setToastState(TOAST_MESSAGE)}
                  >
                     <BsFillPersonVcardFill /> Perfil
                  </div>
                  <div
                     className='flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black mb-[0.4rem]'
                     onClick={() => setToastState(TOAST_MESSAGE)}
                  >
                     <BsClipboard2DataFill /> Administração
                  </div>
                  <div className='pt-[0.4rem] border-t-[1px]'>
                     <div
                        className='flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black'
                        onClick={logout}
                     >
                        <BsBoxArrowLeft /> Logout
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      </header>
   )
}
