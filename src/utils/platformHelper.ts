import ChapterModel from '@/models/ChapterModel'
import LessonModel from '@/models/LessonModel'
import LessonsCompletionModel from '@/models/LessonsCompletionModel'
import { User } from '@/models/interfaces'

interface NextLessonObject {
   chaptersState?: ChapterModel[] | null
   lessonsState?: LessonModel[] | null
   listOfLesson?: LessonModel[] | undefined
   classId?: string | undefined
   theLesson?: LessonModel | undefined
   userDataState?: User
   courseId?: string
}

/**
 * @description Returns a series of functions to set completed lessons or to return next lesson id.
 *
 * @param initialObj object formed by:
 * @param chaptersState?: ChapterModel[] | null
 * @param lessonsState?: LessonModel[] | null
 * @param listOfLesson?: LessonModel[] | undefined
 * @param classId?: string | undefined (lesson id)
 * @param theLesson?: LessonModel | undefined
 * @param userDataState?: User
 * @param courseId?: string
 * @returns setThisLessonAsCompleted, nextLessonId, firstLessonId
 */
export function nextLesson(initialObj: NextLessonObject) {
   const {
      chaptersState,
      lessonsState,
      listOfLesson,
      classId,
      theLesson,
      userDataState,
      courseId,
   } = initialObj

   async function setThisLessonAsCompleted() {
      if (!!classId && !!userDataState) {
         const lessonCompletion = new LessonsCompletionModel({
            userId: userDataState.id,
            courseId: theLesson?.courseId ?? '',
            chapterId: theLesson?.chapterId ?? null,
            lessonId: classId,
         })
         await lessonCompletion.save()
      }
   }

   /**
    * @description Returns the id of the next lesson based in `lessonsCompletionState`. When there is none or it isn't possible to return it returns undefined. Needs `chaptersState`, `lessonsState`, `listOfLesson`, `classId`, `theLesson`, to work.
    * @returns string | undefined
    */
   function nextLessonId() {
      if (!listOfLesson || listOfLesson?.length === 0) return

      const currentIndex = listOfLesson?.findIndex((lesson) => lesson.id === classId)
      if (typeof currentIndex === 'undefined' || currentIndex === -1) return

      // nextIndex means there is another lesson in this same chapter
      const nextIndex = currentIndex !== listOfLesson?.length - 1 ? currentIndex + 1 : undefined
      if (nextIndex) return listOfLesson[nextIndex].id

      if (!!chaptersState && chaptersState.length !== 0 && !!lessonsState) {
         // if this is the last chapter there is no next lesson whatsoever
         const cId = lessonsState.find((lesson) => lesson.id === classId)?.courseId
         const allValidChaptersIds = lessonsState
            .filter((lesson) => lesson.courseId === cId)
            .map((lesson) => lesson.chapterId) as string[]

         const allChaptersIds = allValidChaptersIds.every((value) => value)
            ? chaptersState
                 .map((chapter) => chapter.id)
                 .filter((chapter) => allValidChaptersIds.includes(chapter))
            : chaptersState.map((chapter) => chapter.id)
         const lastChapter = allChaptersIds[allChaptersIds.length - 1]

         if (lastChapter === theLesson?.chapterId) return

         const nextChapterIndex =
            allChaptersIds.findIndex((chap) => chap === theLesson?.chapterId) + 1
         const nextLessonId = [...lessonsState]
            .filter((lesson) => lesson.chapterId === allChaptersIds[nextChapterIndex])
            .sort((a, b) => a.lessonSequence - b.lessonSequence)[0]?.id
         return nextLessonId
      }

      return
   }

   /**
    * @description Returns the id of the first lesson based in `lessonsCompletionState`. When there is none or it sisn't possible to return it returns undefined. This function is Usually used with `nextLessonId` function. Needs `chaptersState`, `lessonsState`, and `theLesson` or `courseId` to work.
    * @returns string | undefined
    */
   function firstLessonId() {
      const cId = theLesson?.courseId ?? courseId
      const firstChapter = !!chaptersState
         ? [...chaptersState]
              .filter((chapter) => chapter.courseId === cId)
              .sort((a, b) => a.chapterSequence - b.chapterSequence)[0]
         : undefined
      const firstLessonId = lessonsState
         ? (!!firstChapter
              ? [...lessonsState].filter(
                   (lesson) => lesson.chapterId === firstChapter.id && lesson.courseId === cId
                )
              : [...lessonsState].filter((lesson) => lesson.courseId === cId)
           )?.sort((a, b) => a.lessonSequence - b.lessonSequence)[0]?.id
         : undefined

      return firstLessonId
   }

   return { setThisLessonAsCompleted, nextLessonId, firstLessonId }
}
