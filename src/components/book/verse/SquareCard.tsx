export default function SquareCard({ children }: { children: React.ReactNode }) {
   return (
      <div className='bg-sky-500 rounded-md min-w-[110px] w-[18vw] min-h-[110px] h-[18vw]'>
         <div className='rounded-b-md w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0)] to-gray-700'>
            {children}
         </div>
      </div>
   )
}
