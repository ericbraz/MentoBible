import InputSubmit from '@/components/book/verse/InputSubmit'

export default function AdminSectionInputSubmit({ value }: { value: string }) {
   return <InputSubmit value={value} className='col-span-6' formality />
}
