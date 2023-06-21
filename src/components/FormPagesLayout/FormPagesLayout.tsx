import Image from 'next/image'

export default function FormPagesLayout({ children }: { children: React.JSX.Element | React.ReactNode }) {
   return (
      <main className='flex flex-col items-center justify-between p-24 min-h-screen'>
         <div className='z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex'>
            <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
               <Image
                  src='/mentobiblecollege.png'
                  alt='Mento Bible Logo'
                  width={150}
                  height={36}
                  priority
               />
            </div>
         </div>

         <div className="relative flex flex-grow items-center justify-center h-full before:absolute before:h-[300px] before:w-[480px] before:-translate-x-2/3 before:rounded-full before:bg-gradient-radial before:from-[#200153] before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-3/4 after:translate-y--[85%] after:bg-gradient-conic after:from-indigo-950 after:via-sky-950 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-900 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#010f37] after:dark:opacity-40 before:lg:h-[360px]">
            <div className='box flex flex-grow justify-center items-center text-white min-h-[350px] z-10'>
               <div className='container w-[350px] flex flex-grow flex-col py-0 px-4 min-h-[350px]'>{children}</div>
            </div>
         </div>
      </main>
   )
}
