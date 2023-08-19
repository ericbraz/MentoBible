import React from 'react'
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useDifferentScreens from '@/hooks/useDifferentScreens'
import Card from '@/components/book/verse/Card'
import { CardProperties } from '@/models/interfaces'
import { ADMIN_COURSE_NAME_EXPOSITION_SLIDES } from '@/constants/config'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

SwiperCore.use([Virtual, Navigation, Pagination])

export default function CustomSwiper({
   sectionTitle,
   slides,
   cardFormat,
   topSection,
}: {
   sectionTitle: string
   slides: CardProperties[]
   cardFormat: 'vertical' | 'square'
   topSection?: boolean
}) {
   const breakpoints = {
      0: { slidesPerView: 1.5, spaceBetween: 10 },
      380: { slidesPerView: 1.5, spaceBetween: -40 },
      620: { slidesPerView: 3.5, spaceBetween: '0.04vw' },
      760: { slidesPerView: 4.5, spaceBetween: '0.02vw' },
   }

   const { isCustomScreenBigger } = useDifferentScreens(760)
   const biggerThanCustomScreen = isCustomScreenBigger()

   return (
      <>
         <h2 className={`text-2xl font-semibold ${!!topSection ? 'mt-12' : 'mt-0'} mb-3`}>
            {sectionTitle}
         </h2>
         <div className={`py-5`}>
            <Swiper breakpoints={breakpoints} navigation={biggerThanCustomScreen}>
               {slides.map((slideContent) => (
                  <SwiperSlide key={slideContent.id}>
                     <Card
                        slideContent={slideContent}
                        image={slideContent.thumbnailURL}
                        cardFormat={cardFormat}
                        topSection={topSection}
                     >
                        {ADMIN_COURSE_NAME_EXPOSITION_SLIDES ? slideContent.name : ''}
                     </Card>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </>
   )
}
