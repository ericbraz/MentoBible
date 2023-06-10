interface InputFieldProps {
   type: string
   placeholder?: string
   name?: string
   value: string
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   required?: boolean
   children?: React.JSX.Element
}

export default function InputField(props: InputFieldProps) {
   const { type, placeholder, name, value, onChange, required, children } = props

   return (
      <div className='input-field flex flex-col'>
         <input
            className='input h-[45px] w-full border-0 outline-none rounded-3xl p-0 pl-11 bg-[rgba(255,255,255,0.5)]'
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
         />
         <i className='relative top-[-31px] left-4 w-fit'>
            {children ? children : <div className='h-4'></div>}
         </i>
      </div>
   )
}
