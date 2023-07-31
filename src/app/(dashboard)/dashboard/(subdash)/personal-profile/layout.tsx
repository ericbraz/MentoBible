export default function PersonalProfileLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <div className='flex justify-center gap-5 rounded-xl h-full w-3/4 bg-slate-50 text-black'>
            <div className='grid grid-cols-2 gap-y-5 w-full'>
               <div className='hidden col-span-1 border-r-[1px] border-slate-950 px-6 py-3 h-full'></div>
               {children}
            </div>
         </div>
      </>
   )
}
