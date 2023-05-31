import Image from 'next/image'
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi'

export default function Home() {
   return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
         <div className='z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex'>
            <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
               <a
                  className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
                  href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <Image
                     src='/mentobiblecollege.png'
                     alt='Mento Bible Logo'
                     className='dark:invert'
                     width={150}
                     height={36}
                     priority
                  />
               </a>
            </div>
         </div>

         <div className="relative flex items-center justify-center place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-900 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            <div className='box flex justify-center items-center text-black z-10'>
               <div className='container w-[350px] flex flex-col py-0 px-4'>
                  <div className='top-header'>
                     <span className='text-sm flex justify-center py-3 px-0'>Have an account?</span>
                     <header className='text-[30px] flex justify-center py-3 px-0'>Login</header>
                  </div>

                  <div className='input-field flex flex-col'>
                     <input
                        className='input h-[45px] w-full border-0 outline-none rounded-3xl p-0 pl-11 bg-[rgba(255,255,255,0.5)]'
                        type='text'
                        placeholder='Username'
                        required
                     />
                     <i className='relative top-[-33px] left-4'>
                        <HiOutlineUser />
                     </i>
                  </div>
                  <div className='input-field flex flex-col'>
                     <input
                        className='input h-[45px] w-full border-0 outline-none rounded-3xl p-0 pl-11 bg-[rgba(255,255,255,0.5)]'
                        type='password'
                        placeholder='Password'
                        required
                     />
                     <i className='relative top-[-33px] left-4'>
                        <HiOutlineLockClosed />
                     </i>
                  </div>
                  <div className='input-field flex flex-col'>
                     <input
                        className='submit border-0 rounded-3xl h-[45px] w-full outline-none bg-[rgba(255,255,255,0.8)] cursor-pointer'
                        type='submit'
                        value='Login'
                     />
                  </div>

                  <div className='bottom flex flex-row justify-between text-sm mt-3'>
                     <div className='left flex'>
                        <input type='checkbox' id='check' />
                        <label htmlFor='check'>Remember me</label>
                     </div>
                     <div className='right'>
                        <label>
                           <a href='#' className='no-underline'>
                              Forgot passord?
                           </a>
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left h-[138px]'></div>
      </main>
   )
}
