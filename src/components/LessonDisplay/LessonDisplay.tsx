'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import VideoPlayerLayout from '../VideoPlayerLayout'
import useCoursesState from '@/hooks/useCoursesState'
import { useEffect, useState } from 'react'
import LessonModel from '@/models/LessonModel'
import { BsArrowRight, BsCheckAll } from 'react-icons/bs'
import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi'
import useUserState from '@/hooks/useUserState'
import CourseModel from '@/models/CourseModel'
import ChapterModel from '@/models/ChapterModel'
import Link from 'next/link'
import FileTypeIcon from '../book/verse/FileTypeIcon'
import useDifferentScreens from '@/hooks/useDifferentScreens'
import useRouterRedirection from '@/hooks/useRouterRedirection'
import { nextLesson } from '@/utils/platformHelper'

export default function LessonDisplay() {
   const { push } = useRouter()
   const params = useSearchParams()
   const classId = params.get('cid') ?? undefined // cid is lessonId

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

   const [theCourse, setTheCourse] = useState<CourseModel>()
   const [theChapter, setTheChapter] = useState<ChapterModel>()
   const [theLesson, setTheLesson] = useState<LessonModel>()
   const [listOfLesson, setListOfLesson] = useState<LessonModel[]>()
   const [isLessonDone, setIsLessonDone] = useState<boolean>()

   // 1.1 This section handles the menu retraction effect when screen width is below 760px
   const { biggerThanCustomScreen } = useDifferentScreens(760)
   const [retractedSideMenu, setRetractedSideMenu] = useState(true)
   const [invisibleText, setInvisibleText] = useState(true)

   useEffect(() => {
      setLessonsState()
   }, [])

   useEffect(() => {
      theCourse && setChaptersState(theCourse.id, 'courseId')
   }, [theCourse])

   useEffect(() => {
      lessonsState && setTheLesson(lessonsState?.find((lesson) => lesson.id === classId))
      lessonsState && setLessonsCompletionState(userDataState.id, classId)
   }, [lessonsState, classId])

   useEffect(() => {
      setIsLessonDone(!!lessonsCompletionState && lessonsCompletionState.length > 0)
   }, [lessonsCompletionState])

   useEffect(() => {
      setTheCourse(coursesState?.find((course) => course.id === theLesson?.courseId) ?? undefined)
      setTheChapter(
         chaptersState?.find((chapter) => chapter.id === theLesson?.chapterId) ?? undefined
      )
   }, [coursesState, chaptersState, theLesson])

   useEffect(() => {
      const lessonRefferenceType = theCourse?.isModular ? 'chapterId' : 'courseId'
      setListOfLesson(
         theCourse?.isModular !== undefined
            ? lessonsState?.filter((lessons) =>
                 lessonRefferenceType === 'chapterId'
                    ? lessons.chapterId === theLesson?.chapterId &&
                      lessons.courseId === theLesson?.courseId
                    : lessons.courseId === theLesson?.courseId
              )
            : undefined
      )
   }, [theCourse, theChapter, theLesson])

   // 1.2 This section handles the menu retraction effect when screen width is below 760px
   function openSidebarMenu(value: boolean) {
      const booleanExp = biggerThanCustomScreen ? false : value
      if (booleanExp) {
         setTimeout(() => setRetractedSideMenu(booleanExp), 500)
         setInvisibleText(booleanExp)
      } else {
         setRetractedSideMenu(booleanExp)
         setTimeout(() => setInvisibleText(booleanExp), 500)
      }
   }
   useEffect(() => {
      openSidebarMenu(!biggerThanCustomScreen)
   }, [biggerThanCustomScreen])

   useRouterRedirection(
      () => {
         const lessonExists = lessonsState?.find((lesson) => lesson.id === classId)
         return !lessonExists || !classId
      },
      lessonsState,
      '/dashboard'
   )

   const { setThisLessonAsCompleted, nextLessonId } = nextLesson({
      chaptersState,
      lessonsState,
      listOfLesson,
      classId,
      theLesson,
      userDataState,
   })

   return (
      <>
         {theLesson ? (
            <div className='relative grid grid-cols-3 760:grid-cols-4 px-0 550:px-8 1200:px-20 w-full h-full'>
               <div className='col-span-3 h-full w-full'>
                  <div className='flex flex-col gap-3 px-4 py-5'>
                     <h1 className='text-base 620:text-2xl font-light'>
                        {theLesson.name}
                        {!!theLesson.title && `: ${theLesson.title}`}
                     </h1>
                     <p className='text-xs 620:text-base text-zinc-400'>
                        {theCourse?.name && (
                           <>
                              Curso: <i>{theCourse.name}</i>
                           </>
                        )}
                     </p>
                  </div>
                  <VideoPlayerLayout videoUrl={theLesson.videoURL} />
                  <div className='flex flex-col gap-8 py-8'>
                     <div className='flex flex-row justify-between'>
                        {!isLessonDone ? (
                           <div
                              className='bg-zinc-700 text-sky-100 hover:bg-sky-300 hover:text-zinc-800 rounded-full px-5 py-2 cursor-pointer transition-all duration-300'
                              onClick={() => {
                                 setThisLessonAsCompleted()
                                 !nextLessonId() && push('/dashboard')
                              }}
                           >
                              <span className='hidden 620:inline'>Marcar como visto</span>
                              <BsCheckAll size={24} className='inline' />
                           </div>
                        ) : (
                           <div
                              className='bg-sky-300 text-zinc-800 rounded-full px-5 py-2 cursor-pointer'
                              style={{ boxShadow: '0 0 5px rgb(125,211,252), 0 0 25px cyan' }}
                           >
                              <span className='hidden 620:inline'>Marcar como visto</span>
                              <BsCheckAll size={24} className='inline' />
                           </div>
                        )}

                        <div
                           className={`bg-zinc-700 text-sky-100 hover:bg-sky-300 hover:text-zinc-800 rounded-full px-5 py-2 cursor-pointer transition-all duration-300 ${
                              nextLessonId() ? '' : 'hidden 620:inline'
                           }`}
                           onClick={() => {
                              !isLessonDone && setThisLessonAsCompleted()
                              nextLessonId()
                                 ? push(`/dashboard/class?cid=${nextLessonId()}`)
                                 : push(`/dashboard/conclusion?course=${theLesson.courseId}`)
                           }}
                        >
                           {nextLessonId() ? (
                              <>
                                 <span className='hidden 620:inline'>Próxima aula</span>
                                 <BsArrowRight size={24} className='inline' />
                              </>
                           ) : (
                              <span className='hidden 620:inline'>Finalizar curso</span>
                           )}
                        </div>
                     </div>
                     {theLesson.description && <div>{theLesson.description}</div>}
                     {theLesson.complementaryMaterialURL && (
                        <div className='flex flex-col gap-3'>
                           <div>Material Complementar (download)</div>
                           <FileTypeIcon
                              fileURL={theLesson.complementaryMaterialURL}
                              iconSize={24}
                           />
                        </div>
                     )}
                  </div>
               </div>
               <div
                  className='absolute top-8 right-0 block 760:hidden z-0 cursor-pointer'
                  onClick={() => openSidebarMenu(false)}
               >
                  <BiSolidLeftArrow size={26} />
               </div>
               <div
                  className={`absolute top-0 right-0 760:relative flex flex-col gap-10 col-span-2 760:col-span-1 row-span-2 bg-zinc-800 760:bg-transparent rounded-l-lg 760:rounded-none 760:border-0 760:border-spacing-0 -mr-5 760:m-0 h-full max-h-screen ${
                     retractedSideMenu
                        ? 'border-0 p-0 760:pl-5 w-0 760:w-full'
                        : 'border-2 border-r-0 border-sky-300 pr-10 760:pr-0 pl-5 py-8 760:py-6 w-full 550:w-2/3'
                  } transition-all duration-700 transform z-[1]`}
               >
                  {theChapter?.name && (
                     <div
                        className={`${
                           invisibleText ? 'text-zinc-800' : 'text-zinc-400'
                        } flex flex-row justify-between 760:block transition duration-300`}
                     >
                        <div>Módulo: {theChapter.name}</div>
                        <div
                           className='text-white 760:hidden block cursor-pointer'
                           onClick={() => openSidebarMenu(true)}
                        >
                           <BiSolidRightArrow size={26} />
                        </div>
                     </div>
                  )}
                  {listOfLesson && (
                     <ul className='flex flex-col gap-10 transition duration-300'>
                        {listOfLesson.map((lesson, idx) => (
                           <li
                              key={lesson.id}
                              className={`${
                                 invisibleText
                                    ? 'text-zinc-800'
                                    : lesson.id === classId
                                    ? 'text-sky-300'
                                    : 'text-zinc-400'
                              }`}
                              style={
                                 invisibleText
                                    ? {}
                                    : lesson.id === classId
                                    ? { textShadow: '0 0 5px rgb(125,211,252), 0 0 15px cyan' }
                                    : {}
                              }
                           >
                              <Link
                                 href={`/dashboard/class?cid=${lesson.id}`}
                                 className='flex flex-row gap-2'
                                 onClick={() => !biggerThanCustomScreen && openSidebarMenu(true)}
                              >
                                 <span>{idx + 1}</span>
                                 <span>
                                    {lesson.name} {lesson.title && `: ${lesson.title}`}
                                 </span>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
               <div className='col-span-3 min-h-0 760:min-h-[20vh]'>
                  {/* Futura selção de comentários das aulas */}
               </div>
            </div>
         ) : (
            <></>
         )}
      </>
   )
}
