import React from 'react'
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useDifferentScreens from '@/hooks/useDifferentScreens'
import Card from '@/components/book/verse/Card'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

SwiperCore.use([Virtual, Navigation, Pagination])

export default function CustomSwiper({
   slides,
   cardFormat,
}: {
   slides: any[]
   cardFormat: 'vertical' | 'square'
}) {
   const breakpoints = {
      // Default parameters
      0: { slidesPerView: 1.5, spaceBetween: 10 },
      // when window width is >= 360px
      380: { slidesPerView: 1.5, spaceBetween: -40 },
      // when window width is >= 500px
      620: { slidesPerView: 3.5, spaceBetween: '0.04vw' },
      // when window width is >= 640px
      760: { slidesPerView: 4.5, spaceBetween: '0.02vw' },
   }

   const { biggerThanCustomScreen } = useDifferentScreens(620)

   return (
      <div className={`flex flex-row gap-8 py-5 right-12`}>
         <Swiper breakpoints={breakpoints} navigation={biggerThanCustomScreen}>
            {slides.map((slideContent) => (
               <SwiperSlide key={slideContent}>
                  <Card cardFormat={cardFormat}>{slideContent}</Card>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}
