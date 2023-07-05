export default function AdminFormDivider({ children }: { children?: string }) {
   return (
      <div className='bg-sky-500 col-span-full mt-5 mb-7 h-[0.5px]'>
         {children && (
            <span className='block bg-[#f6f7fb] ml-8 -mt-[0.875rem] px-3 w-fit'>{children}</span>
         )}
      </div>
   )
}
