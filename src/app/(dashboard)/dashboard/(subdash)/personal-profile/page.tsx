'use client'
import AvatarProfilePicture from '@/components/book/verse/AvatarProfilePicture'
import InputField from '@/components/book/verse/InputField'
import { DEFAULT_PROFILE_IMAGE, EMPTY_USER_OBJECT } from '@/constants/firebase'
import useToastState from '@/hooks/useToastState'
import useUserState from '@/hooks/useUserState'
import UserModel from '@/models/UserModel'
import { User } from '@/models/interfaces'
import { createSquareThumbnail, storeFiles } from '@/utils/modelHelper'
import { useEffect, useRef, useState } from 'react'

export default function PersonalProfilePage() {
   const { setToastState, turnToastOff, turnLoaderToastOn } = useToastState()

   const { userDataState, updateUserDataState, setUserDataStateById } = useUserState()

   const [userLocalDataState, setUserLocalDataState] = useState<User>(EMPTY_USER_OBJECT)

   const [photoURL, setPhotoURL] = useState<File | null>(null)
   const [photoURLString, setPhotoURLString] = useState<string | null>(null)
   async function handleFileChange(
      event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
   ) {
      const input = event.target as HTMLInputElement
      const file = input.files?.[0] || null

      if (file) {
         try {
            const { thumbnailURL, squareImage } = await createSquareThumbnail(file)
            setPhotoURL(squareImage)
            setPhotoURLString(thumbnailURL)
         } catch (error) {
            console.error('Erro ao criar imagem quadrada:', error)
            setToastState(
               {
                  title: 'Erro ao criar imagem quadrada',
                  description: `Tire o print dessa tela e envie ao seu desenvolvedor:<br /> ${error}`,
                  type: 'error',
               },
               60000
            )
         }
      } else {
         setPhotoURL(null)
         setPhotoURLString(null)
      }
   }

   const [userName, setUserName] = useState<string>()
   const [openUserName, setOpenUserName] = useState(false)
   const inputRef = useRef<HTMLInputElement>(null)

   const [bioDescription, setBioDescription] = useState<string>()
   const [openBioDescription, setOpenBioDescription] = useState(false)
   const textareaRef = useRef<HTMLTextAreaElement>(null)

   const [loadingData, setLoadingData] = useState(false)
   useEffect(() => {
      if (!loadingData) {
         setUserName(userDataState.userName ?? '')
         setBioDescription(userDataState.bioDescription)
         setUserLocalDataState(userDataState)
         setPhotoURLString(userDataState.photoURL ?? DEFAULT_PROFILE_IMAGE)
      }
   }, [userDataState])
   useEffect(() => {
      loadingData && setTimeout(() => setLoadingData(false), 300)
   }, [loadingData])

   useEffect(() => {
      openUserName && inputRef.current?.focus()
   }, [openUserName])

   useEffect(() => {
      openBioDescription && textareaRef.current?.focus()
   }, [openBioDescription])

   return (
      <>
         <form
            className='grid grid-cols-2 col-span-2 gap-10 px-6 py-8 w-full'
            onSubmit={async (event) => {
               event.preventDefault()
               turnLoaderToastOn()
               let formattedUser = userLocalDataState
               if (photoURL) {
                  formattedUser = {
                     ...formattedUser,
                     photoURL: await storeFiles(photoURL, 'profile'),
                  }
               }
               const user = new UserModel(formattedUser)
               setLoadingData(true)
               await user.update()
               await setUserDataStateById(user.id)
               turnToastOff()
            }}
         >
            <div className='col-span-2 flex justify-center items-center'>
               <AvatarProfilePicture
                  className='border-[1px] border-slate-950'
                  picValue={photoURLString ?? userDataState.photoURL ?? DEFAULT_PROFILE_IMAGE}
                  onChange={handleFileChange}
               />
            </div>
            <div className='col-span-1 text-right'>Nome de usuário:</div>
            {openUserName ? (
               <InputField
                  type='text'
                  value={userName ?? ''}
                  placeholder={userName ?? userDataState.userName ?? ''}
                  onChange={(event) => setUserName(event.target.value)}
                  onBlurSelect={() => setOpenUserName(false)}
                  className={`col-span-1 text-left -mb-4`}
                  formality
                  adminInputField
                  ref={inputRef}
               />
            ) : (
               <div
                  className='col-span-1 text-left min-h-[45px]'
                  onClick={() => setOpenUserName(true)}
               >
                  <span className='cursor-pointer w-fit h-fit'>
                     {!!userName
                        ? userName
                        : userDataState.userName ?? (
                             <i className='text-zinc-500'>Nome de usuário</i>
                          )}
                  </span>
               </div>
            )}
            <div className='col-span-1 text-right'>Bio:</div>
            {openBioDescription ? (
               <textarea
                  value={bioDescription ?? ''}
                  className={`col-span-1 text-left p-3`}
                  onChange={(event) => setBioDescription(event.target.value)}
                  onBlur={() => setOpenBioDescription(false)}
                  cols={60}
                  rows={8}
                  ref={textareaRef}
               />
            ) : (
               <div
                  className='col-span-1 text-left min-h-[220px]'
                  onClick={() => setOpenBioDescription(true)}
               >
                  <span className='cursor-pointer w-fit h-fit'>
                     {!!bioDescription ? (
                        bioDescription
                     ) : (
                        <i className='text-zinc-500'>Descrição da Bio</i>
                     )}
                  </span>
               </div>
            )}
            <div className='flex justify-center col-span-1'>
               <button
                  className='bg-sky-200 hover:bg-sky-700 hover:text-white rounded-xl px-8 py-3 w-full'
                  onClick={() => {
                     setUserLocalDataState({
                        ...userLocalDataState,
                        userName: userName === '' ? undefined : userName,
                        bioDescription: bioDescription === '' ? undefined : bioDescription,
                     })
                  }}
               >
                  Salvar
               </button>
            </div>
            <div className='flex justify-center col-span-1'>
               <div
                  className='bg-zinc-200 hover:bg-zinc-600 hover:text-white text-center cursor-pointer rounded-xl px-8 py-3 w-full'
                  onClick={async () => await updateUserDataState()}
               >
                  Limpar
               </div>
            </div>
         </form>
      </>
   )
}
