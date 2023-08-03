'use client'
import ThumbnailDisplayForActivation from '@/components/ThumbnailDisplay/ThumbnailDisplayForActivation'
import AdminFormDivider from '@/components/book/verse/AdminFormDivider'
import { COURSE_STATUS_COMPONENTS } from '@/constants/data'
import useCoursesState from '@/hooks/useCoursesState'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'

export default function AdminCourseListPage() {
   const {
      categoriesState,
      coursesState,
      setCoursesState,
      chaptersState,
      setChaptersState,
      lessonsState,
      setLessonsState,
   } = useCoursesState()

   useEffect(() => {
      setCoursesState()
      setChaptersState()
      setLessonsState()
   }, [])

   const categoriesWithLessons = coursesState?.map((courses) => courses.categoryId)
   const categoriesWithLessonsIds = categoriesState?.filter((category) =>
      categoriesWithLessons?.includes(category.id)
   )
   const categoriesWithoutLessonsIds = categoriesState?.filter(
      (category) => !categoriesWithLessons?.includes(category.id)
   )

   const coursesWithLessonsIds = Array.from(new Set(lessonsState?.map((lesson) => lesson.courseId)))
   const coursesWithoutLessonsIds = coursesState
      ?.filter((course) => !coursesWithLessonsIds.includes(course.id))
      ?.map((course) => course.id)

   return (
      <>
         <div className='flex flex-col justify-end items-end gap-2 w-full'>
            <div className='font-semibold'>Legenda</div>
            <div className='grid grid-cols-5 gap-2 gap-x-5'>
               {COURSE_STATUS_COMPONENTS.map((list) => (
                  <Fragment key={list.activation}>
                     <span className='col-span-1'>{list.component}</span>
                     <span className='col-span-4 text-right'>{list.text}</span>
                  </Fragment>
               ))}
            </div>
         </div>
         <div className='flex flex-col gap-5 z-0'>
            {categoriesWithLessonsIds?.map((category) => (
               <div key={category.id}>
                  <AdminFormDivider>
                     <div className='absolute block -top-3'>
                        <div className='relative bg-[#f6f7fb] font-semibold px-3 w-fit'>
                           {category.name.replace(/\s/g, '\u00A0')}
                        </div>
                     </div>
                  </AdminFormDivider>
                  <div className='flex flex-col px-3 py-4'>
                     {!!coursesState?.find((course) => course.categoryId === category.id) &&
                        coursesState
                           ?.filter((course) => course.categoryId === category.id)
                           ?.map((course, idx) => (
                              <div key={course.id} className='grid grid-cols-3 gap-4 py-4'>
                                 <ThumbnailDisplayForActivation
                                    src={course.thumbnailURL}
                                    alt={`Course: ${course.name}`}
                                    id={course.id}
                                    className='cursor-pointer'
                                    text={course.name}
                                    activation={
                                       coursesWithoutLessonsIds?.includes(course.id)
                                          ? 'courseless'
                                          : course.isActive
                                    }
                                    priority={idx <= 1}
                                 />
                                 <div className='col-span-2 flex flex-col'>
                                    {coursesWithoutLessonsIds?.includes(course.id) && (
                                       <div className='bg-red-700 text-white font-semibold mb-4 py-2 px-4 w-fit'>
                                          Não é possível ativar cursos sem aulas
                                       </div>
                                    )}
                                    {course.isModular
                                       ? chaptersState
                                            ?.filter((chapter) => chapter.courseId === course.id)
                                            ?.map((chapter) => (
                                               <div key={chapter.id} className=''>
                                                  <div>
                                                     Módulo: {chapter.name}{' '}
                                                     <span className='text-xs'>
                                                        ({chapter.isActive})
                                                     </span>
                                                  </div>
                                                  <div>
                                                     {lessonsState
                                                        ?.filter(
                                                           (lesson) =>
                                                              lesson.chapterId === chapter.id &&
                                                              lesson.courseId === course.id
                                                        )
                                                        ?.map((lesson) => (
                                                           <div key={lesson.id} className='ml-6'>
                                                              <Link
                                                                 href={`/dashboard/class?cid=${lesson.id}`}
                                                                 className='text-blue-800 decoration-blue-800 hover:text-red-800 hover:decoration-red-800'
                                                              >
                                                                 Aula: {lesson.name}{' '}
                                                                 <span className='text-xs'>
                                                                    ({lesson.isActive})
                                                                 </span>
                                                              </Link>
                                                           </div>
                                                        ))}
                                                  </div>
                                               </div>
                                            ))
                                       : lessonsState
                                            ?.filter((lesson) => lesson.courseId === course.id)
                                            ?.map((lesson) => (
                                               <Link
                                                  key={lesson.id}
                                                  href={`/dashboard/class?cid=${lesson.id}`}
                                                  className='text-blue-800 decoration-blue-800 hover:text-red-800 hover:decoration-red-800'
                                               >
                                                  Aula: {lesson.name}{' '}
                                                  <span className='text-xs'>
                                                     ({lesson.isActive})
                                                  </span>
                                               </Link>
                                            ))}
                                 </div>
                              </div>
                           ))}
                  </div>
               </div>
            ))}
            <div className='grid grid-cols-3 gap-5 py-4 border-t-[1px] border-sky-500'>
               <div className='col-span-3 font-bold'>Categorias sem curso</div>
               {categoriesWithoutLessonsIds?.map((category) => (
                  <div key={category.id}>{category.name}</div>
               ))}
            </div>
         </div>
      </>
   )
}
