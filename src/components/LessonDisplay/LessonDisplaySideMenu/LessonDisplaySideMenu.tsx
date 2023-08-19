'use client'
import useDifferentScreens from '@/hooks/useDifferentScreens'
import ChapterModel from '@/models/ChapterModel'
import LessonModel from '@/models/LessonModel'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi'

export default function LessonDisplaySideMenu({
   chapter,
   lessons,
   lessonId,
}: {
   chapter: ChapterModel | undefined
   lessons: LessonModel[] | undefined
   lessonId: string | undefined
}) {
   const { smallerScreens } = useDifferentScreens()
   const [retractedSideMenu, setRetractedSideMenu] = useState(true)
   const [invisibleText, setInvisibleText] = useState(true)

   // 1.2 This section handles the menu retraction effect when screen width is below 760px
   function openSidebarMenu(value: boolean) {
      const booleanExp = !smallerScreens ? false : value
      if (booleanExp) {
         setTimeout(() => setRetractedSideMenu(booleanExp), 500)
         setInvisibleText(booleanExp)
      } else {
         setRetractedSideMenu(booleanExp)
         setTimeout(() => setInvisibleText(booleanExp), 500)
      }
   }
   useEffect(() => {
      openSidebarMenu(smallerScreens)
   }, [smallerScreens])

   return (
      <>
         <div
            className='absolute top-8 right-0 block 840:hidden z-0 cursor-pointer'
            onClick={() => openSidebarMenu(false)}
         >
            <BiSolidLeftArrow size={26} />
         </div>
         <div
            className={`absolute top-0 right-0 840:relative flex flex-col gap-10 col-span-1 row-span-2 bg-zinc-800 840:bg-transparent rounded-l-lg 840:rounded-none 840:border-0 840:border-spacing-0 -mr-5 840:m-0 h-full max-h-screen ${
               retractedSideMenu
                  ? 'border-0 p-0 840:pl-5 w-0 840:w-full'
                  : 'border-2 border-r-0 border-sky-300 pr-10 840:pr-0 pl-5 py-8 840:py-6 w-full 550:w-2/3'
            } ${smallerScreens ? 'transition-all duration-700 transform' : ''} z-[1]`}
         >
            {chapter?.name && (
               <div
                  className={`${
                     invisibleText && smallerScreens ? 'text-zinc-800' : 'text-zinc-400'
                  } flex flex-row justify-between 840:block ${
                     smallerScreens ? 'transition duration-300' : ''
                  }`}
               >
                  <div>Módulo: {chapter.name}</div>
                  <div
                     className='text-white 840:hidden block cursor-pointer pl-8'
                     onClick={() => openSidebarMenu(true)}
                  >
                     <BiSolidRightArrow size={26} />
                  </div>
               </div>
            )}
            {lessons && (
               <ul className='flex flex-col gap-10 transition duration-300'>
                  {lessons.map((lesson, idx) => (
                     <li
                        key={lesson.id}
                        className={`${
                           invisibleText
                              ? 'text-zinc-800'
                              : lesson.id === lessonId
                              ? 'text-sky-300'
                              : 'text-zinc-400'
                        } ${!chapter?.name && idx === 0 ? 'flex flex-row' : ''}`}
                        style={
                           invisibleText
                              ? {}
                              : lesson.id === lessonId
                              ? { textShadow: '0 0 5px rgb(125,211,252), 0 0 15px cyan' }
                              : {}
                        }
                     >
                        <Link
                           href={`/dashboard/class?cid=${lesson.id}`}
                           className='flex flex-row gap-2'
                           onClick={() => smallerScreens && openSidebarMenu(false)}
                        >
                           <span>{idx + 1}</span>
                           <span>
                              {lesson.name} {lesson.title && `: ${lesson.title}`}
                           </span>
                        </Link>
                        {!chapter?.name && idx === 0 && (
                           <div
                              className='text-white 840:hidden block cursor-pointer pl-8'
                              onClick={() => openSidebarMenu(true)}
                           >
                              <BiSolidRightArrow size={26} />
                           </div>
                        )}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </>
   )
}
