export default function InputSubmit({ value }: { value: string }) {
   return (
      <div className='input-field flex flex-col'>
         <input
            className='submit border-0 rounded-3xl h-[45px] w-full outline-none bg-[rgba(255,255,255,0.8)] cursor-pointer'
            type='submit'
            value={value}
         />
      </div>
   )
}
