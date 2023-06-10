import Image from 'next/image'

export default function FormPagesLayout({ children }: { children: React.JSX.Element | React.ReactNode }) {
   return (
      <main className='flex flex-col items-center justify-between p-24 min-h-screen'>
         <div className='z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex'>
            <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
               <Image
                  src='/mentobiblecollege.png'
                  alt='Mento Bible Logo'
                  className='dark:invert'
                  width={150}
                  height={36}
                  priority
               />
            </div>
         </div>

         <div className="relative flex flex-grow items-center justify-center h-full before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-900 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            <div className='box flex flex-grow justify-center items-center text-black min-h-[350px] z-10'>
               <div className='container w-[350px] flex flex-grow flex-col py-0 px-4 min-h-[350px]'>{children}</div>
            </div>
         </div>
      </main>
   )
}
