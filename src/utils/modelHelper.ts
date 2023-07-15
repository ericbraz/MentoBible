import { storage } from '@/config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export function generateID() {
   const size = 28
   const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
   let id = ''

   for (let i = 0; i < size; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length))
   }

   return id
}

type FoldersTypes = 'cover' | 'thumb' | 'material'

interface FoldersObject {
   folder: FoldersTypes
   path: string
}

export async function storeFiles(image: File | null, folder?: FoldersTypes) {
   if (!image) return undefined

   const fbFolder: FoldersObject[] = [
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
