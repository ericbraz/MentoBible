'use client'
import AdminSectionFormDivider from '@/components/AdminSectionFormDivider'
import AdminSectionInputField from '@/components/AdminSectionFormDivider/AdminSectionInputField'
import AdminSectionInputSubmit from '@/components/AdminSectionFormDivider/AdminSectionInputSubmit'
import TextEditor from '@/components/TextEditor'
import AdminFormDivider from '@/components/book/verse/AdminFormDivider'
import useCoursesState from '@/hooks/useCoursesState'
import useUserState from '@/hooks/useUserState'
import { Category, Course } from '@/models/interfaces'
import CourseService from '@/service/CourseService'
import { useState } from 'react'

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
      description: '',
      thumbnailURL: '',
      coverURL: '',
   }
   const [createCourse, setCreateCourse] = useState(cleanCourseObject)

   const cleanCategoryObject: Omit<Category, 'id' | 'userCreatorId'> = {
      name: '',
      thumbnailURL: '',
      coverURL: '',
   }
   const [createCategory, setCreateCategory] = useState(cleanCategoryObject)

   return (
      <>
         <AdminSectionFormDivider
            title='Criar curso'
            onSubmitFunction={async () => {
               await courseManagement.saveCourse({
                  ...createCourse,
                  userCreatorId: userDataState.id,
               })
               setTimeout(() => setCreateCourse(cleanCourseObject), 5000)
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
               value={createCourse.coverURL ?? ''}
               onChange={(event) =>
                  setCreateCourse({ ...createCourse, coverURL: event.target.value })
               }
               placeholder='Imagem de Capa'
               accept='.jpg,.jpeg,.png,.gif'
            >
               Imagem da capa
            </AdminSectionInputField>
            <AdminSectionInputField
               type='file'
               value={createCourse.thumbnailURL ?? ''}
               onChange={(event) =>
                  setCreateCourse({ ...createCourse, thumbnailURL: event.target.value })
               }
               placeholder='Thumbnail'
               accept='.jpg,.jpeg,.png,.gif'
            >
               Thumbnail
            </AdminSectionInputField>

            <AdminSectionInputSubmit value='Criar novo curso' />
         </AdminSectionFormDivider>

         <AdminSectionFormDivider
            title='Criar categoria'
            onSubmitFunction={async () => {
               await courseManagement.saveCategory({
                  ...createCategory,
                  userCreatorId: userDataState.id,
               })
               setTimeout(() => setCreateCategory(cleanCategoryObject), 5000)
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
               value={createCategory.coverURL ?? ''}
               onChange={(event) =>
                  setCreateCategory({ ...createCategory, coverURL: event.target.value })
               }
               placeholder='Imagem de Capa'
               accept='.jpg,.jpeg,.png,.gif'
            >
               Imagem da capa
            </AdminSectionInputField>
            <AdminSectionInputField
               type='file'
               value={createCategory.thumbnailURL ?? ''}
               onChange={(event) =>
                  setCreateCategory({ ...createCategory, thumbnailURL: event.target.value })
               }
               placeholder='Thumbnail'
               accept='.jpg,.jpeg,.png,.gif'
            >
               Thumbnail
            </AdminSectionInputField>

            <AdminSectionInputSubmit value='Criar novas categoria' />
         </AdminSectionFormDivider>
      </>
   )
}
