import './globals.css'
import { Inter } from 'next/font/google'
import ReduxProvider from './ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'MentoBible College',
   description: 'A plataforma pensada para ensinar cristãos sobre o reino de Deus',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <div className=' min-h-screen'>
               <ReduxProvider>{children}</ReduxProvider>
            </div>
         </body>
      </html>
   )
}
