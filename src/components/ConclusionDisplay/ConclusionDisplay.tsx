'use client'
import useCoursesState from '@/hooks/useCoursesState'
import useUserState from '@/hooks/useUserState'
import CourseModel from '@/models/CourseModel'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LightBulb from '../book/verse/LightBulb'
import { equalArrays } from '@/utils/modelHelper'
import Link from 'next/link'

export default function ConclusionDisplay() {
   const { push } = useRouter()
   const params = useSearchParams()
   const courseId = params.get('course') ?? undefined

   const { userDataState } = useUserState()

   const {
      coursesState,
      lessonsState,
      setLessonsState,
      lessonsCompletionState,
      setLessonsCompletionState,
   } = useCoursesState()

   const [theCourse, setTheCourse] = useState<CourseModel>()
   useEffect(() => {
      setLessonsState()
      setLessonsCompletionState(userDataState.id)
   }, [theCourse])
   useEffect(() => {
      setTheCourse(coursesState?.find((course) => course.id === courseId))
   }, [coursesState])

   const [lessonsIds, setLessonsIds] = useState<string[]>()
   const [completionsIds, setCompletionsIds] = useState<string[]>()
   useEffect(() => {
      !!lessonsState &&
         setLessonsIds(
            lessonsState
               ?.filter((lesson) => lesson.courseId === courseId)
               .map((lesson) => lesson.id)
         )
      !!lessonsCompletionState &&
         setCompletionsIds(
            lessonsCompletionState
               .filter((completion) => completion.courseId === courseId)
               .map((completion) => completion.lessonId)
         )
   }, [lessonsCompletionState])

   const [isInitialRender, setIsInitialRender] = useState(true)
   useEffect(() => {
      const courseExists = coursesState?.find((course) => course.id === courseId)
      const courseReallyConcluded = equalArrays(lessonsIds, completionsIds)
      if (isInitialRender) {
         setIsInitialRender(false)
         return
      }

      if (!courseExists || !courseId || !courseReallyConcluded) push('/dashboard')
   }, [lessonsIds])

   return (
      <>
         {!!theCourse && !!equalArrays(lessonsIds, completionsIds) ? (
            <div className='grid grid-cols-3 gap-4 max-w-[900px] px-4'>
               <div className='flex flex-col justify-center items-start gap-5 col-span-2 text-white text-2xl'>
                  <div>
                     Parabéns{' '}
                     <span className='text-[rgb(85,107,255)]'>{userDataState.firstName}</span>,
                  </div>
                  <div>Você acaba de concluir o curso:</div>
                  <div className='text-4xl'>{theCourse.name}</div>
                  <Link
                     className='bg-zinc-700 text-sky-100 hover:bg-sky-300 hover:text-zinc-800 text-base rounded-full px-5 py-2 w-fit h-fit'
                     href='/dashboard'
                  >
                     Voltar para o início
                  </Link>
               </div>
               <LightBulb className='col-span-1' />
            </div>
         ) : (
            <></>
         )}
      </>
   )
}
