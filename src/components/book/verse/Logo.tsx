import Image from 'next/image'

export default function Logo({ width, height }: { width?: number; height?: number }) {
   const finalWidth = width || 150
   const finalHeight = height || 46

   return (
      <Image
         src='/mentobiblecollege.png'
         alt='Mento Bible Logo'
         width={finalWidth}
         height={finalHeight}
         priority
      />
   )
}
