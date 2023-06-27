import CustomSwiper from './CustomSwiper'

export default function ScrollableElement() {
   const slides = Array.from({ length: 7 }).map((_, index) => `Slide ${index + 1}`)

   return (
      <>
         <div className='w-full'>
            <h2 className='text-2xl font-semibold mb-3'>Cursos</h2>
            <CustomSwiper slides={slides} cardFormat='vertical' />
         </div>
         <div className='w-full'>
            <h2 className='text-2xl font-semibold mb-3 mt-8'>Continue estudando</h2>
            <CustomSwiper slides={slides} cardFormat='square' />
         </div>
      </>
   )
}
