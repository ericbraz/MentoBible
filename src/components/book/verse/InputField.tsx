'use client'
import { generateID } from '@/utils/modelHelper'
import { forwardRef, useImperativeHandle, useRef } from 'react'

interface InputFieldProps {
   type: React.HTMLInputTypeAttribute
   value: string | number | readonly string[]
   id?: string
   placeholder?: string
   name?: string
   accept?: string
   onChange: (
      event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
   ) => void
   onBlurSelect?: (
      event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
   ) => void
   className?: string
   pattern?: string
   required?: boolean
   formality?: boolean
   children?: React.ReactNode
   adminInputField?: boolean
   select?: {
      value: string | number | readonly string[]
      option: string
   }[]
}

interface InputRef {
   focus: () => void
}

const InputField = forwardRef<InputRef, InputFieldProps>(
   (props: InputFieldProps, ref: React.Ref<InputRef>) => {
      const {
         type,
         value,
         id,
         placeholder,
         name,
         accept,
         onChange,
         onBlurSelect,
         className,
         pattern,
         required,
         formality,
         children,
         adminInputField,
         select,
      } = props

      const isAdmin = type !== 'file' ? adminInputField : false

      const inputRef = useRef<HTMLInputElement | null>(null)
      useImperativeHandle(ref, () => ({
         focus: () => {
            inputRef.current?.focus()
         },
      }))

      return (
         <div
            className={`input-field flex flex-col text-black ${className ?? ''} ${
               isAdmin ? 'items-center justify-center' : ''
            }`}
         >
            {type === 'file' && placeholder && (
               <label htmlFor='image' className='pl-11'>
                  Selecione o(a) {placeholder}:
               </label>
            )}
            {type !== 'select' ? (
               <>
                  <input
                     className={`input h-[45px] w-full ${
                        formality
                           ? 'border border-slate-400 rounded-lg px-5'
                           : 'border-0 rounded-3xl px-11'
                     } outline-none p-0 ${
                        type !== 'file' ? 'bg-[rgba(255,255,255,0.6)]' : ''
                     } placeholder-slate-500`}
                     type={type}
                     id={id ?? generateID()}
                     placeholder={placeholder}
                     name={name}
                     value={value}
                     accept={accept}
                     onChange={onChange}
                     onBlur={onBlurSelect}
                     pattern={pattern}
                     required={required}
                     ref={inputRef as React.Ref<HTMLInputElement>}
                  />
               </>
            ) : (
               <select
                  className='input h-[45px] w-full border border-slate-400 rounded-lg outline-none px-5 bg-[rgba(255,255,255,0.6)]'
                  onChange={onChange}
                  id={id}
                  placeholder={placeholder}
                  name={name}
                  required={required}
                  onBlur={onBlurSelect}
                  ref={inputRef as React.Ref<HTMLSelectElement>}
               >
                  <option value=''></option>
                  {select?.map((options) => (
                     <option key={options.option} value={options.value}>
                        {options.option}
                     </option>
                  ))}
               </select>
            )}

            <i className='relative top-[-31px] left-4 w-fit'>
               {children ?? <div className='h-4'></div>}
            </i>
         </div>
      )
   }
)

InputField.displayName = 'InputField'

export default InputField
