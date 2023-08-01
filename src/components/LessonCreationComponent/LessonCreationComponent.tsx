'use client'
import { Lesson } from '@/models/interfaces'
import AdminSectionFormDivider from '../AdminSectionFormDivider'
import AdminSectionInputField from '../AdminSectionFormDivider/AdminSectionInputField'
import AdminSectionInputSubmit from '../AdminSectionFormDivider/AdminSectionInputSubmit'
import TextEditor from '../TextEditor'
import AdminFormDivider from '../book/verse/AdminFormDivider'
import { useEffect, useState } from 'react'
import CourseService from '@/service/CourseService'
import useUserState from '@/hooks/useUserState'
import useCoursesState from '@/hooks/useCoursesState'
import { storeFiles } from '@/utils/modelHelper'
import useToastState from '@/hooks/useToastState'

interface SelectObject {
   value: string
   option: string
   modular: boolean
}

interface SetOfImages {
   cover: File | null
   thumb: File | null
   material: File | null
}

const ERROR_LESSON_SEQUENCE = 9999

export default function LessonCreationComponent() {
   const courseManagement = new CourseService()
   const [selectedCourseId, setSelectedCourseId] = useState<string>()
   const [selectedChapterId, setSelectedChapterId] = useState<string>()
   const cleanLessonObject: Omit<Lesson, 'id' | 'userCreatorId' | 'courseId' | 'chapterId'> = {
      name: '',
      title: '',
      videoURL: '',
      lessonSequence: 0,
      isActive: 'creation',
      description: undefined,
      thumbnailURL: undefined,
      coverURL: undefined,
      complementaryMaterialURL: undefined,
   }
   const [createLesson, setCreateLesson] = useState(cleanLessonObject)

   const { userDataState } = useUserState()
   const { coursesState, chaptersState, setChaptersState, lessonsState, setLessonsState } =
      useCoursesState()
   const courseObj: SelectObject[] | undefined = coursesState?.map((course) => ({
      value: course.id,
      option: course.isModular ? course.name : `${course.name} - Curso não modular`,
      modular: !!course.isModular,
   }))
   const [chapterObj, setChapterObj] = useState<Omit<SelectObject, 'modular'>[] | undefined>()

   useEffect(() => {
      redeemSelectedCourseObj()
   }, [selectedCourseId])
   async function redeemSelectedCourseObj() {
      selectedCourseId && (await setChaptersState(selectedCourseId, 'courseId'))
      selectedCourseId &&
         setChapterObj(
            chaptersState?.map((chapter) => ({
               value: chapter?.id ?? '',
               option: chapter?.name,
            }))
         )
   }
   useEffect(() => {
      selectedCourseId &&
         setChapterObj(
            chaptersState?.map((chapter) => ({
               value: chapter?.id ?? '',
               option: chapter?.name,
            }))
         )
   }, [chaptersState])

   const [tempImagesURL, setTempImagesURL] = useState<SetOfImages>({
      cover: null,
      thumb: null,
      material: null,
   })

   useEffect(() => {
      if (selectedCourseId) {
         const isCourseModular = courseObj?.find((course) => course.value === selectedCourseId)
            ?.modular
            ? 'chapterId'
            : 'courseId'

         if (isCourseModular === 'chapterId' && !!selectedChapterId) {
            setLessonsState(selectedChapterId, isCourseModular)
         } else if (isCourseModular === 'courseId') {
            setLessonsState(selectedCourseId, isCourseModular)
         }
      }
   }, [selectedCourseId, selectedChapterId])

   useEffect(() => {
      const lessonSequence = !!lessonsState
         ? lessonsState.reduce((maxLessonSeq, lesson) => {
              return Math.max(maxLessonSeq, lesson.lessonSequence) + 1
           }, 0)
         : 0
      setCreateLesson({ ...createLesson, lessonSequence: lessonSequence ?? ERROR_LESSON_SEQUENCE })
   }, [lessonsState])

   const { turnLoaderToastOn, turnToastOff } = useToastState()

   return (
      <AdminSectionFormDivider
         title='Criar aula'
         onSubmitFunction={async () => {
            turnLoaderToastOn()
            if (createLesson.lessonSequence === ERROR_LESSON_SEQUENCE)
               throw Error('It was not possible to set lessonSequence property')
            await courseManagement.saveLesson({
               ...createLesson,
               courseId: selectedCourseId ?? null,
               chapterId: selectedChapterId ?? null,
               userCreatorId: userDataState.id,
               coverURL: await storeFiles(tempImagesURL.cover, 'cover'),
               thumbnailURL: await storeFiles(tempImagesURL.thumb, 'thumb'),
               complementaryMaterialURL: await storeFiles(tempImagesURL.material, 'material'),
            })
            setCreateLesson(cleanLessonObject)
            turnToastOff()
         }}
         success='Parabéns! Curso cadastrado com sucesso.<br />Verifique se não há módulos ou aulas pendentes a serem cadastradas na aba de edição de cursos.'
      >
         <AdminSectionInputField
            type='select'
            value={selectedCourseId ?? ''}
            onChange={(event) => {
               setSelectedCourseId(event.target.value)
               setSelectedChapterId(undefined)
            }}
            id='choose-course'
            placeholder='Escolha a categoria'
            select={courseObj}
            required
            formality
         >
            Selecionar curso
         </AdminSectionInputField>
         <AdminSectionInputField
            type='select'
            value={selectedChapterId ?? ''}
            onChange={(event) => {
               setSelectedChapterId(event.target.value)
               setSelectedChapterId(
                  courseObj?.find((course) => course.value === selectedCourseId)?.modular
                     ? event.target.value
                     : undefined
               )
            }}
            id='choose-chapter'
            placeholder='Escolha o módulo'
            select={chapterObj}
            required={!!coursesState?.find((course) => course.id === selectedCourseId)?.isModular}
            formality
         >
            Selecionar módulo
         </AdminSectionInputField>

         <AdminFormDivider>Criação das aulas</AdminFormDivider>

         <AdminSectionInputField
            type='text'
            value={createLesson.name}
            onChange={(event) => setCreateLesson({ ...createLesson, name: event.target.value })}
            id='aula'
            placeholder='Aula'
            required
            formality
         >
            Nome do aula
         </AdminSectionInputField>
         <AdminSectionInputField
            type='text'
            value={createLesson.title}
            onChange={(event) => setCreateLesson({ ...createLesson, title: event.target.value })}
            id='titulo'
            placeholder='Título'
            required
            formality
         >
            Nome do título
         </AdminSectionInputField>
         <AdminSectionInputField
            type='text'
            value={createLesson.videoURL}
            onChange={(event) => setCreateLesson({ ...createLesson, videoURL: event.target.value })}
            id='videoURL'
            placeholder='URL'
            required
            formality
         >
            URL da aula
         </AdminSectionInputField>

         <TextEditor
            value={createLesson.description}
            onChange={(event) =>
               setCreateLesson({ ...createLesson, description: event.target.value })
            }
            id='course-description'
            label='Descrição da aula'
         />

         <AdminSectionInputField
            type='file'
            onChange={(event) => {
               const input = event.target as HTMLInputElement
               const file = (input && input.files?.[0]) || null
               setTempImagesURL({ ...tempImagesURL, cover: file })
            }}
            placeholder='Imagem de Capa'
            accept='.jpg,.jpeg,.png'
         >
            Imagem da capa
         </AdminSectionInputField>
         <AdminSectionInputField
            type='file'
            onChange={(event) => {
               const input = event.target as HTMLInputElement
               const file = (input && input.files?.[0]) || null
               setTempImagesURL({ ...tempImagesURL, thumb: file })
            }}
            placeholder='Thumbnail'
            accept='.jpg,.jpeg,.png'
         >
            Thumbnail
         </AdminSectionInputField>
         <AdminSectionInputField
            type='file'
            onChange={(event) => {
               const input = event.target as HTMLInputElement
               const file = (input && input.files?.[0]) || null
               setTempImagesURL({ ...tempImagesURL, material: file })
            }}
            placeholder='Materiais complementares'
            accept='.jpg, .jpeg, .png, .gif, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf'
         >
            Materiais complementares
         </AdminSectionInputField>

         <AdminSectionInputSubmit value='Criar nova aula' />
      </AdminSectionFormDivider>
   )
}
