import Image from 'next/image'
import Link from 'next/link'

export default function UserDashboard() {
   return (
      <div className='flex flex-col flex-grow items-center justify-center bg-white rounded-xl min-h-[500px]'>
         <div className='flex items-center justify-center bg-[--lighter-blue] rounded-t-xl min-h-[45px] w-full'></div>
         <div className='flex flex-col items-center justify-around min-h-[380px] w-full'>
            <h2 className='text-lg font-semibold px-5 pt-2'>Enviamos um e-mail pra você</h2>
            <Image
               src='/email.gif'
               alt='Open E-mail Icon'
               className='dark:invert'
               width={150}
               height={36}
               priority
            />
            <p className='text-center px-5'>
               Procure o e-mail com o título <strong>Verify your email for mentobible</strong> para
               confirmar seu cadastro.
            </p>
            <Link href='/' className='bg-[--darker-blue] text-white px-7 py-2 rounded-lg mb-2'>
               Acessar
            </Link>
         </div>
         <div className='flex items-center justify-center bg-[#3ba5f0] rounded-b-xl min-h-[75px] w-full'></div>
      </div>
   )
}
