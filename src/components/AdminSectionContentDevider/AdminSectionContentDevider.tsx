'use client'
import { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io'

export default function AdminSectionContentDevider({
   title,
   children,
}: {
   title: string
   children: React.ReactNode
}) {
   const [openTab, setOpenTab] = useState(false)

   return (
      <div
         className={`bg-zinc-800 text-white border-transparent border shadow-md ${
            openTab ? 'h-fit' : 'h-16'
         } transition-all duration-300`}
      >
         <div
            className='flex flex-row items-center justify-between bg-zinc-900 px-4 h-16 cursor-pointer'
            onClick={() => setOpenTab(!openTab)}
         >
            {title}
            {openTab ? <IoMdArrowDropdown size={23} /> : <IoMdArrowDropleft size={23} />}
         </div>
         <div className={`${openTab ? 'flex flex-col gap-8' : 'hidden'} px-6 py-8`}>{children}</div>
      </div>
   )
}
