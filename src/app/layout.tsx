import './globals.css'
import { Inter } from 'next/font/google'
import ReduxProvider from './ReduxProvider'
import ToastNotification from '@/components/book/verse/ToastNotification'
import LoaderComponent from '@/components/book/verse/LoaderComponent'
import FunctionalModal from '@/components/book/verse/FunctionalModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'MentoBible College',
   description: 'A plataforma pensada para ensinar cristãos sobre o reino de Deus',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body className={`${inter.className} h-fit`}>
            <ReduxProvider>
               <div className='grid overflow-hidden min-h-screen h-full'>{children}</div>

               <ToastNotification />
               <LoaderComponent />
               <FunctionalModal />
            </ReduxProvider>
         </body>
      </html>
   )
}
