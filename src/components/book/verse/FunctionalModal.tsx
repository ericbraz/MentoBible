'use client'
import useModalState from '@/hooks/useModalState'

export default function FunctionalModal() {
   const { modalState, setModalStateOut } = useModalState()

   return (
      <div
         className={`fixed top-0 left-0 bottom-0 right-0 ${
            modalState.visibility ? 'flex justify-center items-center' : 'hidden'
         } bg-slate-950 bg-opacity-75 w-screen h-screen z-30`}
         onClick={setModalStateOut}
      >
         <div
            className='flex flex-col justify-around items-center gap-12 bg-white text-slate-800 rounded-lg p-12 w-fit h-fit'
            onClick={(event) => event.stopPropagation()}
         >
            <p>{modalState.text}</p>
            <div className='flex flex-row justify-around items-center gap-12 w-full'>
               <div
                  className='bg-slate-800 hover:bg-teal-600 text-white rounded-md px-4 py-2 cursor-pointer'
                  onClick={async () => {
                     await modalState.onClick()
                     setModalStateOut()
                  }}
               >
                  {modalState.leftButtonText}
               </div>
               {!!modalState.rightButtonText && (
                  <div
                     className='border border-slate-800 hover:border-red-500 hover:text-red-500 rounded-md px-4 py-2 cursor-pointer'
                     onClick={setModalStateOut}
                  >
                     {modalState.rightButtonText}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
