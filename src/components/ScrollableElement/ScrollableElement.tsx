import CustomSwiper from './CustomSwiper'

interface SliderContent {
   title: string
   format: 'vertical' | 'square'
}

export default function ScrollableElement() {
   const slides = Array.from({ length: 12 }).map((_, index) => `Slide ${index + 1}`)

   const sliderContent: SliderContent[] = [
      { title: 'Cursos', format: 'vertical' },
      { title: 'Continue estudando', format: 'square' },
      { title: 'Formação missionária', format: 'square' },
      { title: 'Teologia sistemática', format: 'vertical' },
   ]

   return (
      <>
         {sliderContent.map((slider, idx) => (
            <div className='w-full'>
               <h2 className={`text-2xl font-semibold ${idx ? 'mt-12' : 'mt-0'} mb-3`}>
                  {slider.title}
               </h2>
               <CustomSwiper slides={slides} cardFormat={slider.format} />
            </div>
         ))}
      </>
   )
}
