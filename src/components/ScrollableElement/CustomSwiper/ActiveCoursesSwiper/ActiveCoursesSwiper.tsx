import useActiveCourses from '@/hooks/specificHooks/useActiveCourses'
import CustomSwiper from '../CustomSwiper'
import { SelectedCourse } from '@/models/interfaces'

export default function ActiveCoursesSwiper({
   title,
   cardFormat,
   topSection,
   courseListing,
}: {
   title: string
   cardFormat?: 'vertical' | 'square'
   topSection?: boolean
   courseListing?: SelectedCourse
}) {
   const { activeCourses } = useActiveCourses(courseListing)

   return (
      <>
         {!!activeCourses && activeCourses.length !== 0 && (
            <CustomSwiper
               sectionTitle={title}
               slides={activeCourses}
               cardFormat={cardFormat ?? 'vertical'}
               topSection={topSection}
            />
         )}
      </>
   )
}
