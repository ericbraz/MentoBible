import AdminCourseCreationComponent from '@/components/AdminCourseCreationComponent'
import AdminSectionContentDevider from '@/components/AdminSectionContentDevider'

export default function AdminSectionCourseCreation() {
   const contentOptions = [
      { title: 'Criar curso novo', content: <AdminCourseCreationComponent /> },
      { title: 'Alterar curso', content: 'Nada para ver aqui por enquanto' },
      {
         title: 'Excluir ou inativar curso',
         content: 'Nada para ver aqui por enquanto',
      },
   ]

   return (
      <>
         {contentOptions.map((option) => (
            <AdminSectionContentDevider title={option.title}>
               {option.content}
            </AdminSectionContentDevider>
         ))}
      </>
   )
}
