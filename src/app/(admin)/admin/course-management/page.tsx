'use client'
import { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io'

export default function AdminSectionCourseManagement() {
   const [openTab, setOpenTab] = useState(false)

   return (
      <div className='flex flex-col gap-8'>
         <div
            className={`bg-zinc-800 text-white border-transparent border shadow-md ${
               openTab ? 'h-60' : 'h-16'
            } transition-all`}
            onClick={() => setOpenTab(!openTab)}
         >
            <div className='flex flex-row items-center justify-between bg-zinc-900 px-4 h-16 cursor-pointer'>
               Alterar algum curso
               {openTab ? <IoMdArrowDropdown size={23} /> : <IoMdArrowDropleft size={23} />}
            </div>
            <div className={`${openTab ? 'flex flex-col gap-8' : 'hidden'} px-6 py-4`}>
               Any content
            </div>
         </div>

         <div
            className={`bg-zinc-800 text-white border-transparent border shadow-md ${
               openTab ? 'h-60' : 'h-16'
            } transition-all`}
            onClick={() => setOpenTab(!openTab)}
         >
            <div className='flex flex-row items-center justify-between bg-zinc-900 px-4 h-16 cursor-pointer'>
               Criar um curso
               {openTab ? <IoMdArrowDropdown size={23} /> : <IoMdArrowDropleft size={23} />}
            </div>
            <div className={`${openTab ? 'flex flex-col gap-8' : 'hidden'} px-6 py-4`}>
               Any content
            </div>
         </div>

         <div
            className={`bg-zinc-800 text-white border-transparent border shadow-md ${
               openTab ? 'h-60' : 'h-16'
            } transition-all`}
            onClick={() => setOpenTab(!openTab)}
         >
            <div className='flex flex-row items-center justify-between bg-zinc-900 px-4 h-16 cursor-pointer'>
               Excluir ou inativar um curso
               {openTab ? <IoMdArrowDropdown size={23} /> : <IoMdArrowDropleft size={23} />}
            </div>
            <div className={`${openTab ? 'flex flex-col gap-8' : 'hidden'} px-6 py-4`}>
               Any content
            </div>
         </div>
      </div>
   )
}
