'use client'
import { useEffect, useState } from 'react'
import AdminSectionFormDivider from '../AdminSectionFormDivider'
import AdminSectionInputField from '../AdminSectionFormDivider/AdminSectionInputField'
import AdminSectionInputSubmit from '../AdminSectionFormDivider/AdminSectionInputSubmit'
import TextEditor from '../TextEditor'
import AdminFormDivider from '../book/verse/AdminFormDivider'
import { Chapter } from '@/models/interfaces'
import CourseService from '@/service/CourseService'
import useCoursesState from '@/hooks/useCoursesState'
import useUserState from '@/hooks/useUserState'

export default function ChapterCreationComponent() {
   const courseManagement = new CourseService()
   const cleanChapterObject: Omit<Chapter, 'id' | 'userCreatorId' | 'courseId'> = {
      name: '',
      chapterSequence: 0,
      isActive: 'creation',
      description: undefined,
      thumbnailURL: undefined,
      coverURL: undefined,
   }
   const [createChapter, setCreateChapter] = useState(cleanChapterObject)

   const { userDataState } = useUserState()
   const { coursesState, chaptersState, setChaptersState } = useCoursesState()
   const selectObj = coursesState
      ?.filter((obj) => obj.isModular)
      .map((course) => ({
         value: course.id,
         option: course.name,
      }))

   const [courseId, setCourseId] = useState('')

   const [selectedCourse, setSelectedCourse] = useState('')
   useEffect(() => {
      setChaptersState(selectedCourse, 'courseId')
   }, [selectedCourse, createChapter.name])
   useEffect(() => {
      !!chaptersState?.length
         ? setCreateChapter({
              ...createChapter,
              chapterSequence: chaptersState.length,
           })
         : setCreateChapter({
              ...createChapter,
              chapterSequence: 0,
           })
   }, [chaptersState])

   return (
      <AdminSectionFormDivider
         title='Criar módulo'
         onSubmitFunction={async () => {
            await courseManagement.saveChapter({
               ...createChapter,
               courseId,
               userCreatorId: userDataState.id,
            })
            setCreateChapter(cleanChapterObject)
         }}
         success='Parabéns! Curso cadastrado com sucesso.<br />Verifique se não há módulos ou aulas pendentes a serem cadastradas na aba de edição de cursos.'
      >
         <AdminSectionInputField
            type='select'
            value={courseId}
            onChange={(event) => {
               setCourseId(event.target.value)
               setSelectedCourse(event.target.value)
            }}
            id='choose-category'
            placeholder='Escolha a categoria'
            select={selectObj}
            required
            formality
         >
            Selecionar curso
         </AdminSectionInputField>

         <AdminFormDivider>Criação dos módulos</AdminFormDivider>

         <AdminSectionInputField
            type='text'
            value={createChapter.name}
            onChange={(event) => setCreateChapter({ ...createChapter, name: event.target.value })}
            id='modulo'
            placeholder='Módulo'
            required
            formality
         >
            Nome do módulo
         </AdminSectionInputField>

         <TextEditor
            value={createChapter.description}
            onChange={(event) =>
               setCreateChapter({ ...createChapter, description: event.target.value })
            }
            id='course-description'
            label='Descrição do módulo'
         />

         <AdminSectionInputField
            type='file'
            value={createChapter.coverURL ?? ''}
            onChange={(event) =>
               setCreateChapter({ ...createChapter, coverURL: event.target.value })
            }
            placeholder='Imagem de Capa'
            accept='.jpg,.jpeg,.png,.gif'
         >
            Imagem da capa
         </AdminSectionInputField>
         <AdminSectionInputField
            type='file'
            value={createChapter.thumbnailURL ?? ''}
            onChange={(event) =>
               setCreateChapter({ ...createChapter, thumbnailURL: event.target.value })
            }
            placeholder='Thumbnail'
            accept='.jpg,.jpeg,.png,.gif'
         >
            Thumbnail
         </AdminSectionInputField>

         <AdminSectionInputSubmit value='Criar novo módulo' />
      </AdminSectionFormDivider>
   )
}
