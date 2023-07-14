import useToastState from '@/hooks/useToastState'
import { standardErrorMessage } from '@/utils/authUserHelper'

export default function AdminSectionFormDivider({
   title,
   success,
   onSubmitFunction,
   children,
}: {
   title: string
   success?: string
   children: React.ReactNode
   onSubmitFunction: () => any
}) {
   const { setToastState } = useToastState()

   return (
      <div className='border border-solid border-sky-500 rounded-lg p-4 py-12'>
         <div className='bg-[#f6f7fb] ml-4 -mt-[3.8rem] px-3 pb-5 w-fit'>{title}</div>
         <form
            onSubmit={async (event) => {
               event.preventDefault()
               try {
                  await onSubmitFunction()
                  success &&
                     setToastState(
                        {
                           title: 'Sucesso',
                           description: success,
                           type: 'success',
                        },
                        12000
                     )
               } catch (error) {
                  console.log(error)
                  setToastState(standardErrorMessage(error), 65000)
               }
            }}
            className='grid grid-cols-6 gap-5 gap-y-10'
         >
            {children}
         </form>
      </div>
   )
}
