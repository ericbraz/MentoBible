'use client'
import InputField from '@/components/book/verse/InputField'
import { useState } from 'react'

export default function AdminCourseCategoryCreation() {
   const [creationData, setCreationData] = useState('')

   return (
      <>
         <div>Criar categorias de cursos</div>
         <div>
            <InputField
               type='text'
               placeholder='Nome da categoria'
               value={creationData}
               onChange={(event) => setCreationData(event.target.value)}
               required
            />
            <InputField
               type='file'
               placeholder='Imagem de Capa'
               value={creationData}
               accept='.jpg,.jpeg,.png,.gif'
               onChange={(event) => setCreationData(event.target.value)}
               required
            />
            <InputField
               type='file'
               placeholder='Thumbnail'
               value={creationData}
               accept='.jpg,.jpeg,.png,.gif'
               onChange={(event) => setCreationData(event.target.value)}
               required
            />
         </div>
      </>
   )
}
