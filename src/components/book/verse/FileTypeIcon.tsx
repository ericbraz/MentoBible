import { FileType } from '@/models/interfaces'
import { getFileNameAndTypeFromURL } from '@/utils/modelHelper'
import { AiFillFileImage, AiFillFilePdf } from 'react-icons/ai'
import { RiFileWord2Fill, RiFileExcel2Fill, RiFilePpt2Fill } from 'react-icons/ri'

export default function FileTypeIcon({
   fileURL,
   iconSize,
}: {
   fileURL: string
   iconSize?: number
}) {
   const { fileName, fileType } = getFileNameAndTypeFromURL(fileURL)

   const images: FileType[] = ['.jpg', '.jpeg', '.png', '.gif']
   const docs: FileType[] = ['.doc', '.docx']
   const sheets: FileType[] = ['.xls', '.xlsx']
   const slides: FileType[] = ['.ppt', '.pptx']
   const pdf: FileType[] = ['.pdf']

   function IconFileComponent() {
      if (images.includes(fileType)) return <AiFillFileImage size={iconSize} />
      if (docs.includes(fileType))
         return <RiFileWord2Fill size={iconSize} className='text-[rgb(0,167,241)]' />
      if (sheets.includes(fileType))
         return <RiFileExcel2Fill size={iconSize} className='text-[rgb(47,197,130)]' />
      if (slides.includes(fileType))
         return <RiFilePpt2Fill size={iconSize} className='text-[rgb(255,143,107)]' />
      if (pdf.includes(fileType))
         return <AiFillFilePdf size={iconSize} className='text-[rgb(233,0,17)]' />

      return <></>
   }

   return (
      <a href={fileURL} className='flex flex-row gap-5 w-fit' download>
         <div>{fileName}</div>
         <div>{IconFileComponent()}</div>
      </a>
   )
}
