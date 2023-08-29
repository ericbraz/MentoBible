import ScrollableElement from '@/components/ScrollableElement'
import Banner from '@/components/book/chapter/Banner'

export default function UserDashboard() {
   return (
      <>
         <Banner />

         <div className='below-image-gradient relative h-20'></div>

         <div className='relative pl-12 lg:pl-24 text-slate-200 -mt-16'>
            <ScrollableElement />
         </div>
      </>
   )
}
