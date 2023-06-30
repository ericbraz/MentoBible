export interface Category {
   id: string
   name: string
   thumbnailURL?: string // thumbnail image
   coverURL?: string // cover image
}

export interface Course {
   id: string
   categoryId: string
   name: string
   isActive: 'creation' | 'active' | 'inactive'
   isModular?: boolean
   description?: string
   thumbnailURL?: string
   coverURL?: string
}

export interface Chapter {
   id: string
   courseId: string
   name: string
   chapterSequence: number
   isActive: 'creation' | 'active' | 'inactive'
   description?: string
   thumbnailURL?: string
   coverURL?: string
}

export interface Lesson {
   id: string
   courseId: string | null
   chapterId: string | null
   name: string
   title: string
   videoURL: string
   lessonSequence: number
   isActive: 'creation' | 'active' | 'inactive'
   coverURL?: string
   thumbnailURL?: string
   description?: string
   complementaryMaterialURL?: string
}

export interface User {
   id: string
   firstName: string
   lastName: string
   email: string
   active: boolean
   userRoleIds?: string[]
   photoURL?: string
   signUpDate?: Date
   courseIds?: string[]
   lessonCompletionIds?: string[]
}

export interface LessonsCompletion {
   id: string
   userId: string
   lessonId: string
   completionDate: Date
}

export interface Role {
   id: string
   name: 'user' | 'moderator' | 'administrator' | 'master'
   idSystem: string[]
}

export interface System {
   id: string
   systemName: string
   systemPath: string
}
