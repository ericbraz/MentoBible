import Image from 'next/image'

export default function Logo({
   width,
   height,
   shorter,
   onClick,
}: {
   width?: number
   height?: number
   shorter?: boolean
   onClick?: React.MouseEventHandler<HTMLImageElement>
}) {
   const orientation = shorter ? 'square' : 'horizontal'

   let finalWidth: number
   let finalHeight: number

   if (orientation === 'horizontal') {
      finalWidth = width || 150
      finalHeight = height || 43
   } else {
      finalWidth = width || 46
      finalHeight = height || 46
   }

   return (
      <Image
         src={
            orientation === 'horizontal'
               ? '/mentobiblecollege-.png'
               : '/mentobiblecollege-shorter.png'
         }
         alt='Mento Bible Logo'
         width={finalWidth}
         height={finalHeight}
         onClick={onClick}
         priority
      />
   )
}
