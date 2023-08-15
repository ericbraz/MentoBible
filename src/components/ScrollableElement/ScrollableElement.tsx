import { FILTERED_SLIDER_CONTENT } from '@/constants/data'
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper'

SwiperCore.use([Virtual, Navigation, Pagination])

export default function ScrollableElement() {
   return (
      <>
         {FILTERED_SLIDER_CONTENT.map((slider) => (
            <div key={slider.id} className='w-full'>
               {slider.component}
               <div className='h-14'></div>
            </div>
         ))}
      </>
   )
}
