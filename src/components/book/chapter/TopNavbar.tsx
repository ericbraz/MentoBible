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
import Link from 'next/link'
import useAccessSystems from '@/hooks/useAccessSystems'

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

   const { accessibleSystemsObject, accessibleSystemsList } = useAccessSystems()
   function userAuthorization(url: string) {
      return (
         accessibleSystemsList[0] !== undefined &&
         accessibleSystemsList[0] !== '' &&
         accessibleSystemsList.some((system) => url.includes(system))
      )
   }
   const [isUserAuthorized, setIsUserAuthorized] = useState(false)
   useEffect(() => {
      setIsUserAuthorized(userAuthorization('/admin/home'))
   }, [accessibleSystemsObject[0]])

   return (
      <header
         className={`fixed top-0 flex items-center justify-between gap-12 py-4 px-12 lg:px-24 h-20 w-screen transition-colors duration-[600ms] z-10 ${bgClass}`}
      >
         <div>
            <Logo />
         </div>
         <nav className='hidden 550:flex 550:flex-1 550:gap-5 font-medium'>
            <Link
               href='/dashboard'
               className={`flex flex-row hover:underline cursor-pointer ${
                  pathname === '/dashboard' ? 'text-sky-400' : 'text-slate-300'
               }`}
            >
               Início {/* dashboard */}
            </Link>{' '}
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
                  <Link
                     href='/dashboard'
                     className='550:hidden flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black'
                  >
                     <BsFillHouseDoorFill /> Início
                  </Link>
                  <div
                     className='550:hidden flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black'
                     onClick={() => setToastState(TOAST_MESSAGE)}
                  >
                     <BsListCheck /> Lista de aulas
                  </div>
                  <Link
                     href='/dashboard/personal-profile'
                     className={`flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black ${
                        !isUserAuthorized ? 'mb-[0.4rem]' : ''
                     }`}
                  >
                     <BsFillPersonVcardFill /> Perfil
                  </Link>
                  {isUserAuthorized && (
                     <Link
                        href='/admin/home'
                        className='flex flex-row gap-2 px-4 py-3 cursor-pointer hover:bg-black mb-[0.4rem]'
                     >
                        <BsClipboard2DataFill /> Administração
                     </Link>
                  )}
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
