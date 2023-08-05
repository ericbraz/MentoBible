'use client'
import useCoursesState from '@/hooks/useCoursesState'
import useRouterRedirection from '@/hooks/useRouterRedirection'
import useUserState from '@/hooks/useUserState'
import CourseModel from '@/models/CourseModel'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LightBulb from '../book/verse/LightBulb'
import { equalArrays } from '@/utils/modelHelper'

export default function ConclusionDisplay() {
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
      setTheCourse(coursesState?.find((course) => course.id === courseId))
   }, [coursesState])
   useEffect(() => {
      setLessonsCompletionState(userDataState.id)
      theCourse && setLessonsState(theCourse.id, 'courseId')
   }, [theCourse])

   const lessonsIds = lessonsState?.map((lesson) => lesson.id)
   const completionsIds = lessonsCompletionState
      ?.filter((completion) => completion.courseId === courseId)
      .map((completion) => completion.lessonId)

   useRouterRedirection(
      () => {
         const courseExists = coursesState?.find((course) => course.id === courseId)
         const courseReallyConcluded =
            !!lessonsIds && !!completionsIds && !equalArrays(lessonsIds, completionsIds)
         return !courseExists || !courseId || courseReallyConcluded
      },
      coursesState,
      '/dashboard'
   )

   return (
      <>
         {!!theCourse ? (
            <div className='grid grid-cols-3 gap-4 max-w-[900px]'>
               <LightBulb className='col-span-1' />
               <div className='flex flex-col justify-center gap-10 col-span-2 text-white text-3xl text-center'>
                  <div>
                     Parabéns{' '}
                     <span className='text-[rgb(85,107,255)]'>{userDataState.firstName}</span>,
                  </div>
                  <div>Você acaba de concluir o curso:</div>
                  <div className='text-5xl'>{theCourse.name}</div>
               </div>
            </div>
         ) : (
            <></>
         )}
      </>
   )
}
