export default function SubDashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <div className='h-20'></div>
         <div className='p-5 pr-5 760:pr-9 w-screen min-h-screen'>
            <div className='flex flex-col items-center w-full min-h-full'>{children}</div>
         </div>
      </>
   )
}
