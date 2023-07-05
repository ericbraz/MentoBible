export default function InputSubmit({
   value,
   className,
   formality,
}: {
   value: string
   className?: string
   formality?: boolean
}) {
   return (
      <div className={`input-field flex flex-col text-black ${className ?? ''}`}>
         <input
            className={`submit border-0 ${
               formality
                  ? 'bg-[rgba(255,255,255,0.9)] hover:bg-sky-600 hover:text-white rounded-lg'
                  : 'bg-[rgba(255,255,255,0.9)] rounded-3xl'
            } h-[45px] w-full outline-none cursor-pointer`}
            type='submit'
            value={value}
         />
      </div>
   )
}
