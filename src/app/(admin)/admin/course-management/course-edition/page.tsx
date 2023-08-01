'use client'
import AdminSectionFormDivider from '@/components/AdminSectionFormDivider'
import AdminSectionInputField from '@/components/AdminSectionFormDivider/AdminSectionInputField'
import AdminSectionInputSubmit from '@/components/AdminSectionFormDivider/AdminSectionInputSubmit'
import TextEditor from '@/components/TextEditor'
import AdminFormDivider from '@/components/book/verse/AdminFormDivider'
import useCoursesState from '@/hooks/useCoursesState'
import useToastState from '@/hooks/useToastState'
import useUserState from '@/hooks/useUserState'
import { Category, Course } from '@/models/interfaces'
import CourseService from '@/service/CourseService'
import { storeFiles } from '@/utils/modelHelper'
import { useEffect, useState } from 'react'

interface CategorySetOfImages {
   categoryCover: File | null
   categoryThumb: File | null
}

interface CourseSetOfImages {
   courseCover: File | null
   courseThumb: File | null
}

export default function AdminCourseEditionPage() {
   const { userDataState } = useUserState()
   const { categoriesState } = useCoursesState()
   const selectObj = categoriesState?.map((category) => ({
      value: category.id,
      option: category.name,
   }))

   const courseManagement = new CourseService()

   const cleanCourseObject: Omit<Course, 'id' | 'userCreatorId'> = {
      categoryId: '',
      name: '',
      isActive: 'creation',
      isModular: false,
      description: undefined,
      thumbnailURL: undefined,
      coverURL: undefined,
   }
   const [createCourse, setCreateCourse] = useState(cleanCourseObject)
   const [categorySetOfImages, setCategorySetOfImages] = useState<CategorySetOfImages>({
      categoryCover: null,
      categoryThumb: null,
   })

   const cleanCategoryObject: Omit<Category, 'id' | 'userCreatorId'> = {
      name: '',
      thumbnailURL: undefined,
      coverURL: undefined,
   }
   const [createCategory, setCreateCategory] = useState(cleanCategoryObject)
   const [courseSetOfImages, setCourseSetOfImages] = useState<CourseSetOfImages>({
      courseCover: null,
      courseThumb: null,
   })

   const { turnLoaderToastOn, turnToastOff } = useToastState()

   return (
      <>
         <AdminSectionFormDivider
            title='Criar curso'
            onSubmitFunction={async () => {
               turnLoaderToastOn()
               await courseManagement.saveCourse({
                  ...createCourse,
                  userCreatorId: userDataState.id,
                  coverURL: await storeFiles(courseSetOfImages.courseCover, 'cover'),
                  thumbnailURL: await storeFiles(courseSetOfImages.courseThumb, 'thumb'),
               })
               setCreateCourse(cleanCourseObject)
               turnToastOff()
            }}
            success='Parabéns! Curso cadastrado com sucesso.<br />Verifique se não há módulos ou aulas pendentes a serem cadastradas na aba de edição de cursos.'
         >
            <AdminSectionInputField
               type='select'
               value={createCourse.categoryId}
               onChange={(event) =>
                  setCreateCourse({ ...createCourse, categoryId: event.target.value })
               }
               id='choose-category'
               placeholder='Escolha a categoria'
               select={selectObj}
               required
               formality
            >
               Selecionar
               <br />
               categoria do curso
            </AdminSectionInputField>

            <AdminFormDivider>Dados do curso</AdminFormDivider>

            <AdminSectionInputField
               type='text'
               value={createCourse.name}
               onChange={(event) => setCreateCourse({ ...createCourse, name: event.target.value })}
               id='course'
               placeholder='Curso'
               required
               formality
            >
               Nome do curso
            </AdminSectionInputField>
            <AdminSectionInputField
               type='select'
               value={createCourse.isModular?.toString()}
               onChange={(event) => {
                  const isModularValue = event.target.value === 'true'
                  setCreateCourse({ ...createCourse, isModular: isModularValue })
               }}
               id='choose-category'
               placeholder='Escolha a categoria'
               select={[
                  { value: 'true', option: 'Sim' },
                  { value: 'false', option: 'Não' },
               ]}
               formality
            >
               Curso contém módulos?
            </AdminSectionInputField>

            <TextEditor
               value={createCourse.description}
               onChange={(event) =>
                  setCreateCourse({ ...createCourse, description: event.target.value })
               }
               id='course-description'
               label='Descrição do curso'
            />

            <AdminSectionInputField
               type='file'
               onChange={(event) => {
                  const input = event.target as HTMLInputElement
                  const file = (input && input.files?.[0]) || null
                  setCourseSetOfImages({ ...courseSetOfImages, courseCover: file })
               }}
               placeholder='Imagem de Capa'
               accept='.jpg,.jpeg,.png,.gif,.webp'
            >
               Imagem da capa
            </AdminSectionInputField>
            <AdminSectionInputField
               type='file'
               onChange={(event) => {
                  const input = event.target as HTMLInputElement
                  const file = (input && input.files?.[0]) || null
                  setCourseSetOfImages({ ...courseSetOfImages, courseThumb: file })
               }}
               placeholder='Thumbnail'
               accept='.jpg,.jpeg,.png,.gif,.webp'
            >
               Thumbnail
            </AdminSectionInputField>

            <AdminSectionInputSubmit value='Criar novo curso' />
         </AdminSectionFormDivider>

         <AdminSectionFormDivider
            title='Criar categoria'
            onSubmitFunction={async () => {
               turnLoaderToastOn()
               await courseManagement.saveCategory({
                  ...createCategory,
                  userCreatorId: userDataState.id,
                  coverURL: await storeFiles(categorySetOfImages.categoryCover, 'cover'),
                  thumbnailURL: await storeFiles(categorySetOfImages.categoryThumb, 'thumb'),
               })
               setCreateCategory(cleanCategoryObject)
               turnToastOff()
            }}
            success='Parabéns! Categoria cadastrada com sucesso.'
         >
            <AdminSectionInputField
               type='text'
               value={createCategory.name}
               onChange={(event) =>
                  setCreateCategory({ ...createCategory, name: event.target.value })
               }
               id='category'
               placeholder='Categoria'
               required
               formality
            >
               Nome da categoria
            </AdminSectionInputField>
            <AdminSectionInputField
               type='file'
               onChange={(event) => {
                  const input = event.target as HTMLInputElement
                  const file = (input && input.files?.[0]) || null
                  setCategorySetOfImages({ ...categorySetOfImages, categoryCover: file })
               }}
               placeholder='Imagem de Capa'
               accept='.jpg,.jpeg,.png,.gif,.webp'
            >
               Imagem da capa
            </AdminSectionInputField>
            <AdminSectionInputField
               type='file'
               onChange={(event) => {
                  const input = event.target as HTMLInputElement
                  const file = (input && input.files?.[0]) || null
                  setCategorySetOfImages({ ...categorySetOfImages, categoryThumb: file })
               }}
               placeholder='Thumbnail'
               accept='.jpg,.jpeg,.png,.gif,.webp'
            >
               Thumbnail
            </AdminSectionInputField>

            <AdminSectionInputSubmit value='Criar novas categoria' />
         </AdminSectionFormDivider>
      </>
   )
}
