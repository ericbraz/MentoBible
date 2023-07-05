export default function TextEditor({
   label,
   id,
   value,
   onChange,
}: {
   label: string
   id: string
   value: string | number | readonly string[] | undefined
   onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
   return (
      <>
         <div className='col-span-1 flex items-center justify-end'>
            <label htmlFor={id} className='text-right'>
               {label}
            </label>
         </div>
         <div id={id} className={`col-span-5`}>
            <textarea
               value={value}
               className={`block col-span-5 p-7 h-64 w-[600px] resize-none`}
               onChange={onChange}
               cols={60}
               rows={8}
            />
         </div>
      </>
   )
}
