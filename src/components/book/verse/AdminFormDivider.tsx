export default function AdminFormDivider({ children }: { children?: React.ReactNode }) {
   return (
      <div className='bg-sky-500 col-span-full mt-5 mb-7 h-[0.5px]'>
         {children && (
            <div className='relative bg-[#f6f7fb] ml-8 -mt-[0.875rem] px-3 w-fit'>{children}</div>
         )}
      </div>
   )
}
