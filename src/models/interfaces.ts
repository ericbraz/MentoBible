export interface Category {
   id: string
   name: string
   // tests may reffer only to course categories that have this value as true
   testingType: boolean
   thumbnailURL?: string /* thumbnail image */
   coverURL?: string /* cover image */
}

export interface Course {
   id: string
   categoryId: string
   name: string
   testing: boolean
   testingCompletion?: number // percentage of completion of the course so the user may be ellegible to make the test
   description?: string
   thumbnailURL?: string
   coverURL?: string
}

export interface Chapter {
   id: string
   courseId: string
   name: string
   chapterSequence: number
   testing: boolean
   testingCompletion?: number
   description?: string
   thumbnailURL?: string
   coverURL?: string
}

export interface Lesson {
   id: string
   chapterId: string
   name: string
   title: string
   videoURL: string
   lessonSequence: number
   description?: string
   thumbnailURL?: string
   coverURL?: string
}

export interface Test {
   id: string
   // at least one of ids below must be null
   // so there must be a verification in the code
   courseId: string | null
   chapterId: string | null
   testContent: TestContent[]
   courseEligibility: 0.7 | 0.8 | 0.9 | 1
}

export interface TestContent {
   content: [
      { question: string },
      { answers: string[] } /* multiple choice */,
      { correctAnswer: boolean[] } /* only one true element */
   ]
}

export interface TestPerformance {
   id: string
   userId: string
   // at least one of ids below must be null
   // so there must be a verification in the code
   courseId: string | null
   chapterId: string | null
   grade: number
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
   lessonCompletionIds?: LessonsCompletion[]
   testCompletionIds?: string[]
   performanceIds?: string[]
}

interface LessonsCompletion {
   id: string
   userId: string
   lessonId: string
   completionDate: Date
}

export interface Role {
   id: string
   name: 'user' | 'moderator' | 'administrator' | 'master'
   systems: string
   pathSystems: string
}
