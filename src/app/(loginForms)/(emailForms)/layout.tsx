import Image from 'next/image'
import Link from 'next/link'

export default function EmailFormsLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className='flex flex-col flex-grow items-center justify-center bg-white rounded-xl min-h-[500px]'>
         <div className='flex items-center justify-center bg-[--lighter-blue] rounded-t-xl min-h-[45px] w-full'></div>
         <div className='flex flex-col items-center justify-around min-h-[380px] w-full'>
            <Image
               src='/email.gif'
               alt='Open E-mail Icon'
               className='dark:invert'
               width={150}
               height={36}
               priority
            />
            <p className='text-center px-5'>{children}</p>
            <Link href='/login' className='bg-[--darker-blue] text-white px-7 py-2 rounded-lg mb-2'>
               Acessar MentoBible
            </Link>
         </div>
         <div className='flex items-center justify-center bg-[#3ba5f0] rounded-b-xl min-h-[75px] w-full'></div>
      </div>
   )
}
