'use cliente'
import { CourseCreationType } from '@/models/interfaces'
import ThumbnailDisplay from '../ThumbnailDisplay'
import useCoursesState from '@/hooks/useCoursesState'
import CourseModel from '@/models/CourseModel'
import LessonModel from '@/models/LessonModel'
import ChapterModel from '@/models/ChapterModel'
import useModalState from '@/hooks/useModalState'

export default function ThumbnailDisplayForActivation({
   src,
   alt,
   id,
   className,
   text,
   activation,
   priority,
}: {
   src: string | undefined
   alt: string
   id: string
   className?: string
   text?: string
   activation?: CourseCreationType | 'courseless'
   priority?: boolean
}) {
   const { setModalState } = useModalState()

   const { coursesState, chaptersState, lessonsState } = useCoursesState()
   const theCourse = coursesState?.find((course) => course.id === id)
   const theChapters = chaptersState?.filter((chapter) => chapter.courseId === id)
   const theLessons = lessonsState?.filter((lesson) => lesson.courseId === id)

   async function changeAllIsActiveProperty(activation: CourseCreationType | 'courseless') {
      if (activation && activation !== 'courseless') {
         if (activation !== 'active') {
            !!theCourse && (await CourseModel.updateStatus(theCourse, 'active'))
            !!theChapters &&
               theChapters.forEach(async (chapter) => {
                  await ChapterModel.updateStatus(chapter, 'active')
               })
            !!theLessons &&
               theLessons.forEach(async (lesson) => {
                  await LessonModel.updateStatus(lesson, 'active')
               })
         } else {
            !!theCourse && (await CourseModel.updateStatus(theCourse, 'inactive'))
            !!theChapters &&
               theChapters.forEach(async (chapter) => {
                  await ChapterModel.updateStatus(chapter, 'inactive')
               })
            !!theLessons &&
               theLessons.forEach(async (lesson) => {
                  await LessonModel.updateStatus(lesson, 'inactive')
               })
         }
      }
   }

   return (
      <div
         className='flex flex-col justify-center items-center col-span-1 min-h-[300px] w-full'
         onClick={async () => {
            if (activation && activation !== 'courseless') {
               setModalState({
                  text:
                     activation !== 'active'
                        ? `Tem certeza que deseja ativar o curso ${theCourse?.name}?`
                        : `Tem certeza que deseja DESATIVAR o curso ${theCourse?.name}`,
                  leftButtonText: 'Sim',
                  rightButtonText: 'Não',
                  onClick: async () => await changeAllIsActiveProperty(activation),
               })
            }
         }}
      >
         <ThumbnailDisplay
            src={src}
            alt={alt}
            className={className}
            text={text}
            activation={activation}
            priority={priority}
         />
      </div>
   )
}
