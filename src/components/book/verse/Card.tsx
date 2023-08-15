'use client'
import {
   ADMIN_COURSE_CARD_BACKGROUND_CHANGE,
   ADMIN_COURSE_CARD_GRADIENT_SLIDES,
   ADMIN_COURSE_CARD_TEXT_EXPANSION_ANIMATION,
   ADMIN_COURSE_NAME_EXPOSITION_SLIDES,
} from '@/constants/config'
import { DEFAULT_COURSE_THUMBNAIL } from '@/constants/firebase'
import useCoursesState from '@/hooks/useCoursesState'
import useUserState from '@/hooks/useUserState'
import LessonModel from '@/models/LessonModel'
import { CardProperties } from '@/models/interfaces'
import { nextLesson } from '@/utils/platformHelper'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Card({
   children,
   slideContent,
   image,
   cardFormat,
   topSection,
}: {
   children: React.ReactNode
   slideContent: CardProperties
   image: string | undefined
   cardFormat?: 'vertical' | 'square'
   topSection?: boolean
}) {
   const cardOrientation = cardFormat ?? 'vertical'

   const classes =
      cardOrientation === 'vertical'
         ? 'min-h-[198px] h-[80vw] 620:h-[48vw] 760:h-[32vw]'
         : 'min-h-[110px] h-[45vw] 620:h-[24vw] 760:h-[18vw]'

   const { userDataState } = useUserState()
   const {
      coursesState,
      chaptersState,
      setChaptersState,
      lessonsState,
      setLessonsState,
      lessonsCompletionState,
      setLessonsCompletionState,
   } = useCoursesState()

   const [theLesson, setTheLesson] = useState<LessonModel>()
   const [lessonId, setLessonId] = useState<string>()
   const [listOfLesson, setListOfLesson] = useState<LessonModel[]>()

   useEffect(() => {
      if (slideContent.type === 'course') setLessonsCompletionState(userDataState.id)

      setChaptersState()
      setLessonsState()
   }, [userDataState])

   useEffect(() => {
      const lastLessonCompletion = lessonsCompletionState
         ? [...lessonsCompletionState]
              .filter((completion) => completion.courseId === slideContent.id)
              .sort((a, b) => b.completionDate.getTime() - a.completionDate.getTime())[0]
         : undefined
      if (!!lastLessonCompletion) {
         setListOfLesson(lessonsState?.filter((lesson) => lesson.courseId === slideContent.id))
         setLessonId(lastLessonCompletion.lessonId)
         setTheLesson(lessonsState?.find((lesson) => lesson.id === lastLessonCompletion.lessonId))
      }
   }, [coursesState, lessonsState, lessonsCompletionState])

   const { nextLessonId, firstLessonId } = nextLesson({
      chaptersState,
      lessonsState,
      listOfLesson,
      classId: lessonId,
      theLesson,
      courseId: slideContent.id,
   })

   const [lessonLinkId, setLessonLinkId] = useState(nextLessonId() ?? firstLessonId())
   useEffect(() => {
      if (
         !!chaptersState &&
         chaptersState.length > 0 &&
         !!lessonsState &&
         lessonsState.length > 0
      ) {
         setLessonLinkId(nextLessonId() ?? firstLessonId())
      }
   }, [chaptersState, lessonsState, listOfLesson, lessonId, theLesson])

   const [subtextVisibility, setSubtextVisibility] = useState(false)

   return (
      <div
         className={`relative rounded-md min-w-[110px] w-[45vw] 620:w-[24vw] 760:w-[18vw] ${classes}`}
         onMouseOver={() => setSubtextVisibility(true)}
         onMouseLeave={() => setSubtextVisibility(false)}
      >
         <Link
            href={`/dashboard/class?cid=${lessonLinkId}`}
            className='relative rounded-b-md w-full h-full cursor-pointer'
         >
            <div className='relative h-full w-full'>
               <Image
                  src={!!image ? image : DEFAULT_COURSE_THUMBNAIL}
                  alt={children as string}
                  fill
                  priority={topSection}
                  loading={!topSection ? 'lazy' : 'eager'}
                  className='rounded-md object-cover'
                  sizes='(max-width: 100%) 100%, (max-width: 100%) 100%'
               />
               <div
                  className={`absolute ${
                     ADMIN_COURSE_CARD_GRADIENT_SLIDES
                        ? `bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(44,7,104,0.5)] ${
                             ADMIN_COURSE_CARD_BACKGROUND_CHANGE
                                ? 'hover:from-[rgba(44,7,104,0.3)] hover:to-[rgba(44,7,104,1)]'
                                : ''
                          }`
                        : ''
                  } transition-grid duration-700 rounded-md w-full h-full`}
               >
                  <div className='absolute bottom-0 px-4 pb-3'>
                     <div>{children}</div>
                     {ADMIN_COURSE_NAME_EXPOSITION_SLIDES &&
                        ADMIN_COURSE_CARD_TEXT_EXPANSION_ANIMATION &&
                        lessonsState?.find((lesson) => lesson.id === lessonLinkId) && (
                           <div
                              className={`grid overflow-hidden font-light transition-grid duration-700 ${
                                 subtextVisibility ? 'grid-rows-1 pt-6' : 'grid-rows-[0] pt-0'
                              }`}
                           >
                              Aula:{' '}
                              {lessonsState.find((lesson) => lesson.id === lessonLinkId)?.name}
                           </div>
                        )}
                  </div>
               </div>
            </div>
         </Link>
      </div>
   )
}
