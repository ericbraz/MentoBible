import { useEffect, useState } from 'react'
import useCoursesState from '../useCoursesState'
import { CardProperties, CardPropertiesType, SelectedCourse } from '@/models/interfaces'
import CourseModel from '@/models/CourseModel'
import {
   ADMIN_SELECTED_COURSES_TO_DISPLAY,
   ADMIN_SELECTED_COURSE_BY_TOPICS,
   MAX_DAYS_FOR_NEW_COURSES_SLIDES,
   MAX_SIZE_OF_SLIDES,
} from '@/constants/config'

export default function useActiveCourses(selection?: SelectedCourse) {
   const { coursesState } = useCoursesState()
   const [activeCourses, setActiveCourses] = useState<CardProperties[]>()
   useEffect(() => {
      setActiveCourses(giveSelectedCourse())
   }, [coursesState])

   function giveSelectedCourse() {
      if (!coursesState) return

      let course = coursesState
         ?.filter((course) => course.isActive === 'active')
         .filter((course) => !!course.creationDate) as Array<
         Omit<CourseModel, 'creationDate'> & { creationDate: Date }
      >
      const maxDays = MAX_DAYS_FOR_NEW_COURSES_SLIDES
      const currentDate = new Date()
      const limitDate = new Date(currentDate)
      limitDate.setDate(limitDate.getDate() - maxDays)
      if (selection === 'fresh') {
         course = [...course]
            .filter((course) => !!course.creationDate)
            .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
            .filter((course) => course.creationDate > limitDate)
      }
      if (selection === 'old') {
         course = [...course]
            .filter((course) => !!course.creationDate)
            .sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())
            .filter((course) => course.creationDate < limitDate)
      }
      if (selection === 'selected') {
         course = [...course].filter((course) =>
            ADMIN_SELECTED_COURSES_TO_DISPLAY.includes(course.id)
         )
      }
      if (selection === 'topic') {
         course = [...course].filter((course) =>
            ADMIN_SELECTED_COURSE_BY_TOPICS.includes(course.id)
         )
      }
      /* if (selection === 'restart') {
      }
      if (selection === 'popular') {
      } */

      const maxSlides = MAX_SIZE_OF_SLIDES
      course.slice(0, maxSlides)

      return course?.map((course) => ({
         id: course.id,
         name: course.name,
         isActive: course.isActive,
         isModular: course.isModular,
         categoryId: course.categoryId,
         thumbnailURL: course.thumbnailURL,
         coverURL: course.coverURL,
         type: 'course' as CardPropertiesType,
      }))
   }

   return { activeCourses }
}
