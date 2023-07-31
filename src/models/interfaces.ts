export interface Category {
   id: string
   name: string
   creationDate?: Date
   thumbnailURL?: string // thumbnail image
   coverURL?: string // cover image
   userCreatorId: string
}

export type CourseCreationType = 'creation' | 'active' | 'inactive'

export interface Course {
   id: string
   categoryId: string
   name: string
   isActive: CourseCreationType
   creationDate?: Date
   isModular?: boolean
   description?: string
   thumbnailURL?: string
   coverURL?: string
   userCreatorId: string
}

export interface Chapter {
   id: string
   courseId: string
   name: string
   chapterSequence: number
   isActive: CourseCreationType
   creationDate?: Date
   description?: string
   thumbnailURL?: string
   coverURL?: string
   userCreatorId: string
}

export interface Lesson {
   id: string
   courseId: string | null
   chapterId: string | null
   name: string
   title: string
   videoURL: string
   lessonSequence: number
   isActive: CourseCreationType
   creationDate?: Date
   coverURL?: string
   userCreatorId: string
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
   userName?: string
   bioDescription?: string
   userRoleIds?: string[]
   photoURL?: string
   signUpDate?: Date
   courseIds?: string[]
   lessonCompletionIds?: string[]
}

export interface LessonsCompletion {
   id: string
   userId: string
   courseId: string
   chapterId: string | null
   lessonId: string
   completionDate: Date
}

export interface Role {
   id: string
   name: RoleNames
   idSystem: string[]
}

export type RoleNames = 'user' | 'moderator' | 'administrator' | 'master'

export interface System {
   id: string
   systemName: string
   systemPath: string
}

export type FileType =
   | '.jpg'
   | '.jpeg'
   | '.png'
   | '.gif'
   | '.doc'
   | '.docx'
   | '.xls'
   | '.xlsx'
   | '.ppt'
   | '.pptx'
   | '.pdf'
