'use client'
import useCoursesState from '@/hooks/useCoursesState'
import { useEffect } from 'react'

export default function AdminCourseListPage() {
   const {
      categoriesState,
      coursesState,
      chaptersState,
      setChaptersState,
      lessonsState,
      setLessonsState,
   } = useCoursesState()

   useEffect(() => {
      setChaptersState()
      setLessonsState()
   }, [])

   return (
      <div className='flex flex-col gap-5'>
         {categoriesState?.map((category) => (
            <div key={category.id}>
               <div>{category.name}</div>
               <div className='pl-8 text-red-700'>
                  {coursesState
                     ?.filter((course) => course.categoryId === category.id)
                     ?.map((course) => (
                        <div key={course.id}>
                           <div>
                              {course.name} ({course.isModular ? 'Modular' : 'Não Modular'})
                           </div>
                           <div className='ml-8 text-white bg-red-950 w-fit'>
                              {course.isModular
                                 ? chaptersState
                                      ?.filter((chapter) => chapter.courseId === course.id)
                                      ?.map((chapter) => (
                                         <div key={chapter.id} className='px-2'>
                                            <div>
                                               Módulo: {chapter.name} ({chapter.chapterSequence + 1}
                                               )
                                            </div>
                                            <div>
                                               {lessonsState
                                                  ?.filter(
                                                     (lesson) => lesson.chapterId === chapter.id
                                                  )
                                                  ?.map((lesson) => (
                                                     <div
                                                        key={lesson.id}
                                                        className='ml-8 px-2 bg-yellow-400 text-black'
                                                     >
                                                        Aula: {lesson.name} (
                                                        {lesson.lessonSequence + 1})
                                                     </div>
                                                  ))}
                                            </div>
                                         </div>
                                      ))
                                 : lessonsState
                                      ?.filter((lesson) => lesson.courseId === course.id)
                                      ?.map((lesson) => (
                                         <div key={lesson.id} className='px-2'>
                                            Aula: {lesson.name} ({lesson.lessonSequence + 1})
                                         </div>
                                      ))}
                           </div>
                        </div>
                     ))}
               </div>
            </div>
         ))}
      </div>
   )
}
