import { storage } from '@/config/firebase'
import { FileType } from '@/models/interfaces'
import { deleteField } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export function generateID(length?: number) {
   const size = length ?? 28
   const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
   let id = ''

   for (let i = 0; i < size; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length))
   }

   return id
}

export function userNameFormatter(firstName: string, lastName: string) {
   const first = firstName.replace(/\s/g, '').toLowerCase()
   const last = lastName.replace(/\s/g, '').toLowerCase()

   return `${first}.${last}_${generateID(6)}`
}

export function filterUndefinedInObjects<T extends { [key: string]: unknown }>(object: T) {
   const filteredUser = Object.fromEntries(
      Object.entries(object).filter(([_, value]) => value !== undefined)
   ) as T

   return filteredUser
}

export function filterUndefinedInObjectsToExclusion<T extends { [key: string]: unknown }>(
   object: T
): T {
   const filteredObject = Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
         if (value === undefined) {
            return [key, deleteField()]
         }
         return [key, value]
      })
   ) as T

   return filteredObject
}

type FoldersTypes = 'profile' | 'cover' | 'thumb' | 'material'

interface FoldersObject {
   folder: FoldersTypes
   path: string
}

export async function storeFiles(image: File | null | undefined, folder?: FoldersTypes) {
   if (!image) return undefined

   const fbFolder: FoldersObject[] = [
      { folder: 'profile', path: '/imagens-de-perfis/' },
      { folder: 'cover', path: '/capas-de-cursos/' },
      { folder: 'thumb', path: '/thumbnails/' },
      { folder: 'material', path: '/materiais-complementares/' },
   ]

   const imageRef = ref(
      storage,
      `${fbFolder.find((cont) => cont.folder === folder)?.path ?? ''}${generateID()}-${image.name}`
   )

   const uploadURL = await uploadBytes(imageRef, image).then(async (snapshot) => {
      return await getDownloadURL(snapshot.ref).then((url) => {
         return url
      })
   })

   return uploadURL
}

export async function createSquareThumbnail(
   file: File
): Promise<{ thumbnailURL: string; squareImage: File }> {
   return new Promise((resolve) => {
      const reader = new FileReader()

      reader.onload = async () => {
         const image = new Image()
         image.src = reader.result as string

         image.onload = async () => {
            const maxSize = Math.max(image.width, image.height)
            const minSize = Math.min(image.width, image.height)

            // Determine the scale factor to resize the smaller dimension to 320 pixels
            const scaleFactor = 320 / minSize
            const resizedWidth = image.width * scaleFactor
            const resizedHeight = image.height * scaleFactor

            // Create a new canvas for the resized image
            const canvas = document.createElement('canvas')
            canvas.width = resizedWidth
            canvas.height = resizedHeight
            const ctx = canvas.getContext('2d')

            // Draw the resized image on the canvas
            ctx?.drawImage(image, 0, 0, resizedWidth, resizedHeight)

            // Calculate the starting point for cropping the image to make it square
            const startX = (resizedWidth - 320) / 2
            const startY = (resizedHeight - 320) / 2

            // Create a new canvas for the square thumbnail
            const thumbnailCanvas = document.createElement('canvas')
            thumbnailCanvas.width = 320
            thumbnailCanvas.height = 320
            const thumbnailCtx = thumbnailCanvas.getContext('2d')

            // Draw the cropped square image on the thumbnail canvas
            thumbnailCtx?.drawImage(canvas, startX, startY, 320, 320, 0, 0, 320, 320)

            // Convert the thumbnail canvas content to a Blob object with the correct MIME type
            const thumbnailBlob = await new Promise<Blob | null>((resolve) => {
               thumbnailCanvas.toBlob((blob) => resolve(blob), file.type, 0.8)
            })

            if (thumbnailBlob) {
               const squareImage = new File([thumbnailBlob], file.name, {
                  type: thumbnailBlob.type,
               })

               // Get the square thumbnail as data URL
               const thumbnailURL = thumbnailCanvas.toDataURL(thumbnailBlob.type, 0.8)

               resolve({ thumbnailURL, squareImage })
            } else {
               console.error('Error creating square thumbnail: Blob is null.')
               resolve({ thumbnailURL: '', squareImage: file })
            }
         }
      }

      reader.readAsDataURL(file)
   })
}

export function getFileNameAndTypeFromURL(url: string) {
   const fileNameWithExtension = url.split('?')[0].substring(url.lastIndexOf('/') + 1)

   const fileName = extractFileName(fileNameWithExtension.split('.')[0])

   const fileType = ('.' + fileNameWithExtension.split('.').pop()) as FileType

   return {
      fileName,
      fileType,
   }
}

// This function below is complementary to the function above
function extractFileName(fullFileName: string): string {
   const splitName = fullFileName.split('%2F')[1]
   const parts = splitName.split('-')
   parts.shift()
   return parts.join('-')
}
