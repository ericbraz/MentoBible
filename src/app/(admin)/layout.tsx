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

export default function AdminSectionLayout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <header className='fixed bg-slate-950 flex flex-col gap-8 h-screen w-60 z-[1]'>
            <div className='bg-[rgb(8,14,32)] flex flex-row items-center justify-start pl-4 border-transparent border-b shadow-lg h-16'>
               <Logo />
            </div>
            <nav className='flex flex-col gap-3'>
               <AdminNavigationLink href='/admin'>
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
               <AdminNavigationLink href='/admin/course-management'>
                  <BsFillBookFill size={21} />
                  Cursos
               </AdminNavigationLink>
               <AdminNavigationLink>
                  <BsFillChatLeftQuoteFill size={21} />
                  Comentários
               </AdminNavigationLink>
            </nav>
         </header>
         <div className='bg-[#f6f7fb] text-black min-h-screen w-full'>
            <div className='fixed flex flex-row items-center justify-end gap-5 bg-white border-transparent border-b shadow-lg pl-[18rem] pr-14 h-16 w-full z-0'>
               <Link href='/dashboard'>Sair</Link>
            </div>
            <div className='pt-16 pl-60'>
               <div className='mx-14 my-10'>{children}</div>
            </div>
         </div>
      </div>
   )
}
