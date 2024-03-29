'use client'
import InputField from '@/components/book/verse/InputField'

interface AdminSectionInputFieldProps {
   type: React.HTMLInputTypeAttribute
   value?: string | number | boolean | readonly string[]
   onChange: (
      event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
   ) => void
   onBlurSelect?: (
      event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
   ) => void
   id?: string
   placeholder?: string
   name?: string
   pattern?: string
   accept?: string
   required?: boolean
   formality?: boolean
   children?: React.ReactNode
   select?: {
      value: string | number | readonly string[]
      option: string
   }[]
}

export default function AdminSectionInputField(props: AdminSectionInputFieldProps) {
   const {
      type,
      value,
      onChange,
      onBlurSelect,
      id,
      placeholder,
      name,
      pattern,
      accept,
      required,
      formality,
      children,
      select,
   } = props

   return (
      <>
         <div className='col-span-1 flex items-center justify-end'>
            <label htmlFor={id} className='text-right'>
               {children}
            </label>
         </div>
         <InputField
            type={type}
            value={typeof value === 'boolean' ? value.toString() : value}
            id={id}
            placeholder={placeholder}
            name={name}
            accept={accept}
            onChange={onChange}
            onBlurSelect={onBlurSelect}
            className={`col-span-5`}
            pattern={pattern}
            required={required}
            formality={formality}
            select={select}
            adminInputField
         />
      </>
   )
}
