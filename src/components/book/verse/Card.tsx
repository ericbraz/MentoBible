export default function Card({
   children,
   cardFormat,
}: {
   children: React.ReactNode
   cardFormat?: 'vertical' | 'square'
}) {
   const cardOrientation = cardFormat ?? 'vertical'

   const classes =
      cardOrientation === 'vertical'
         ? 'min-h-[198px] h-[80vw] 620:h-[48vw] 760:h-[32vw]'
         : 'min-h-[110px] h-[45vw] 620:h-[24vw] 760:h-[18vw]'

   return (
      <div
         className={`bg-sky-500 rounded-md min-w-[110px] w-[45vw] 620:w-[24vw] 760:w-[18vw] ${classes}`}
      >
         <div className='rounded-b-md w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0)] to-gray-700'>
            {children}
         </div>
      </div>
   )
}
