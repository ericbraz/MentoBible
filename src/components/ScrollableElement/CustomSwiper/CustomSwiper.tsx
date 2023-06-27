import React from 'react'
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useDifferentScreens from '@/hooks/useDifferentScreens'
import VerticalCard from '@/components/book/verse/VerticalCard'
import SquareCard from '@/components/book/verse/SquareCard'

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
      // when window width is >= 325px
      325: { slidesPerView: 1.5, spaceBetween: -80 },
      // when window width is >= 360px
      360: { slidesPerView: 2.5, spaceBetween: 10 },
      // when window width is >= 500px
      500: { slidesPerView: 3.5, spaceBetween: 10 },
      // when window width is >= 640px
      640: { slidesPerView: 4.5, spaceBetween: 10 },
   }

   const { biggerThanCustomScreen } = useDifferentScreens(800)

   return (
      <div className={`flex flex-row gap-8 py-5 right-12`}>
         <Swiper
            breakpoints={breakpoints}
            simulateTouch={!biggerThanCustomScreen}
            navigation={biggerThanCustomScreen}
         >
            {slides.map((slideContent) => (
               <SwiperSlide key={slideContent}>
                  {cardFormat === 'vertical' && <VerticalCard>{slideContent}</VerticalCard>}
                  {cardFormat === 'square' && <SquareCard>{slideContent}</SquareCard>}
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}
