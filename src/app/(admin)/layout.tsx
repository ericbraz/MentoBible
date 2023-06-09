'use client'
import React from 'react'
import AdminNavigationLink from '@/components/book/verse/AdminNavigationLink'
import Logo from '@/components/book/verse/Logo'
import Link from 'next/link'
import {
   BsFillHouseFill,
   BsFillBarChartFill,
   BsFillBookFill,
   BsFillChatLeftQuoteFill,
   BsPersonFillGear,
} from 'react-icons/bs'
import Image from 'next/image'
import useUserState from '@/hooks/useUserState'
import AdminPrivateRoute from './AdminPrivateRoute'

export default function AdminSectionLayout({ children }: { children: React.ReactNode }) {
   const { userDataState } = useUserState()
   const photo = (userDataState.photoURL as string) ?? '/standard-avatar.png'

   return (
      <AdminPrivateRoute>
         <header className='fixed bg-slate-950 flex flex-col gap-8 h-screen w-60 z-[1]'>
            <div className='bg-[rgb(8,14,32)] flex flex-row items-center justify-start pl-4 border-transparent border-b shadow-lg h-16'>
               <Logo />
            </div>
            <nav className='flex flex-col gap-3'>
               <AdminNavigationLink href='/admin/home'>
                  <BsFillHouseFill size={21} />
                  Home
               </AdminNavigationLink>
               <AdminNavigationLink>
                  <BsFillBarChartFill size={21} />
                  Dados
               </AdminNavigationLink>
               <AdminNavigationLink>
                  <BsPersonFillGear size={21} />
                  Usuários
               </AdminNavigationLink>
               <AdminNavigationLink
                  href='/admin/course-management'
                  sublinks={[
                     { title: 'Categorias', url: '/admin/course-management/categories' },
                     { title: 'Criar curso', url: '/admin/course-management/creation' },
                     { title: 'Editar curso', url: '/admin/course-management/edit' },
                     { title: 'Excluir ou inativar curso', url: '/admin/course-management/inact' },
                  ]}
               >
                  <BsFillBookFill size={21} />
                  Cursos
               </AdminNavigationLink>
               <AdminNavigationLink>
                  <BsFillChatLeftQuoteFill size={21} />
                  Comentários
               </AdminNavigationLink>
            </nav>
         </header>
         <div className='bg-[#f6f7fb] text-black mb-16 min-h-screen h-full w-full'>
            <div className='fixed flex flex-row items-center justify-end gap-5 bg-white border-transparent border-b shadow-lg pl-[18rem] pr-14 h-16 w-full z-0'>
               <Link href='/dashboard'>Sair</Link>
               <span>{userDataState.firstName}</span>
               <Image
                  src={photo}
                  alt='User Avatar'
                  width={50}
                  height={50}
                  className='rounded-full'
               />
            </div>
            <div className='pt-16 pl-60 h-full'>
               <div className='mx-14 my-10'>
                  <div className='flex flex-col gap-14'>{children}</div>
               </div>
            </div>
         </div>
      </AdminPrivateRoute>
   )
}
