import Link from 'next/link'

export default function Footer() {
   return (
      <footer className='relative mt-20 border-t border-white'>
         <div className='flex flex-col-reverse 620:flex-row items-center justify-center px-12 lg:px-24 py-16 text-sm text-slate-200 gap-4'>
            <div className='flex-1 flex border-t-neutral-50'>
               Copyright &copy; {new Date().getFullYear()} - Mento Bible. Todos os direitos
               reservados.
            </div>
            <nav className='flex-1 flex flex-col gap-2 items-center 620:items-end'>
               <div className='underline text-sky-400 hover:text-slate-300'>
                  <Link href='#'>Termos da comunidade Mento Bible</Link>
               </div>
               <div className='underline text-sky-400 hover:text-slate-300'>
                  <Link href='#'>Termos de Uso</Link>
               </div>
               <div className='underline text-sky-400 hover:text-slate-300'>
                  <Link href='#'>Política de Privacidade</Link>
               </div>
            </nav>
         </div>
      </footer>
   )
}
