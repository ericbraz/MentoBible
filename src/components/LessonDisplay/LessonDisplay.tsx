'use client'
import { useSearchParams } from 'next/navigation'
import VideoPlayerLayout from '../VideoPlayerLayout'
import useCoursesState from '@/hooks/useCoursesState'
import { useEffect, useState } from 'react'
import LessonModel from '@/models/LessonModel'
import { BsArrowRight, BsCheckAll } from 'react-icons/bs'
import useUserState from '@/hooks/useUserState'
import CourseModel from '@/models/CourseModel'
import ChapterModel from '@/models/ChapterModel'
import FileTypeIcon from '../book/verse/FileTypeIcon'
import useRouterRedirection from '@/hooks/useRouterRedirection'
import { nextLesson } from '@/utils/platformHelper'
import LessonDisplayButton from './LessonDisplayButton'
import LessonDisplaySideMenu from './LessonDisplaySideMenu'

export default function LessonDisplay() {
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
   const [isLessonDone, setIsLessonDone] = useState<boolean>(false)

   useEffect(() => {
      setLessonsState()
   }, [])

   useEffect(() => {
      theCourse && setChaptersState(theCourse.id, 'courseId')
   }, [theCourse])

   useEffect(() => {
      lessonsState && setTheLesson(lessonsState?.find((lesson) => lesson.id === classId))
      lessonsState && setLessonsCompletionState(userDataState.id)
   }, [lessonsState, classId])

   useEffect(() => {
      setIsLessonDone(
         !!lessonsCompletionState &&
            lessonsCompletionState.length > 0 &&
            !!lessonsCompletionState.find((completion) => completion.lessonId === classId)
      )
   }, [lessonsCompletionState, classId])

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
            <div className='relative grid grid-cols-2 840:grid-cols-3 px-0 550:px-8 1200:px-20 w-full h-full'>
               <div className='col-span-2 h-full w-full'>
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
                        <LessonDisplayButton
                           active={!isLessonDone}
                           onDivClick={() => setThisLessonAsCompleted()}
                        >
                           <span className='hidden 620:inline'>Marcar como visto</span>
                           <BsCheckAll size={24} className='inline' />
                        </LessonDisplayButton>

                        <LessonDisplayButton
                           className={nextLessonId() ? '' : 'hidden 620:inline'}
                           href={
                              nextLessonId()
                                 ? `/dashboard/class?cid=${nextLessonId()}`
                                 : `/dashboard/conclusion?course=${theLesson.courseId}`
                           }
                           onAnchorClick={async () => {
                              !isLessonDone && (await setThisLessonAsCompleted())
                              setLessonsCompletionState(userDataState.id)
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
                        </LessonDisplayButton>
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
               <LessonDisplaySideMenu
                  chapter={theChapter}
                  lessons={listOfLesson}
                  lessonId={classId}
               />
               <div className='col-span-2 min-h-0 840:min-h-[20vh]'>
                  {/* Futura selção de comentários das aulas */}
               </div>
            </div>
         ) : (
            <></>
         )}
      </>
   )
}
