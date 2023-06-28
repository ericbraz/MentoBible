import TopNavbar from '@/components/book/chapter/TopNavbar'
import PrivateRoute from './PrivateRoute'
import Footer from '@/components/book/chapter/Footer'

export default function DashLayout({ children }: { children: React.ReactNode }) {
   return (
      <PrivateRoute>
         <div className='relative flex flex-col max-w-[100vw]'>
            <TopNavbar />

            {children}

            <Footer />
         </div>
      </PrivateRoute>
   )
}
