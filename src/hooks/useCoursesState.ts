import { db } from '@/config/firebase'
import CategoryModel from '@/models/CategoryModel'
import ChapterModel from '@/models/ChapterModel'
import CourseModel from '@/models/CourseModel'
import LessonModel from '@/models/LessonModel'
import LessonsCompletionModel from '@/models/LessonsCompletionModel'
import {
   getCategoriesState,
   getChaptersState,
   getCoursesState,
   getLessonsCompletionState,
   getLessonsState,
   rescueCategoriesState,
   rescueChaptersState,
   rescueCoursesState,
   rescueLessonsCompletionState,
   rescueLessonsState,
} from '@/store/coursesSlice'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useCoursesState() {
   const dispatch = useDispatch()

   const categoriesState = useSelector(getCategoriesState)
   const setCategoriesState = async function (id?: string) {
      const setCategories = (categories: CategoryModel[]) => {
         dispatch(rescueCategoriesState(categories))
      }
      if (id) {
         const data = await CategoryModel.find(id)
         data && setCategories([data])
      } else {
         const categoriesRef = collection(db, CategoryModel.PATH)
         const mainQuery = query(categoriesRef, orderBy('name'))
         CategoryModel.listenToQuery(mainQuery, setCategories)
      }
   }

   const coursesState = useSelector(getCoursesState)
   const setCoursesState = async function (id?: string) {
      const setCourses = (courses: CourseModel[]) => {
         dispatch(rescueCoursesState(courses))
      }
      if (id) {
         const data = await CourseModel.find(id)
         data && setCourses([data])
      } else {
         const coursesRef = collection(db, CourseModel.PATH)
         const mainQuery = query(coursesRef, orderBy('name'))
         CourseModel.listenToQuery(mainQuery, setCourses)
      }
   }

   const chaptersState = useSelector(getChaptersState)
   const setChaptersState = async function (id?: string, byExternalId?: 'courseId') {
      const setChapters = (chapters: ChapterModel[]) => {
         dispatch(rescueChaptersState(chapters))
      }
      if (id && !byExternalId) {
         const data = await ChapterModel.find(id)
         data && setChapters([data])
      } else {
         const chaptersRef = collection(db, ChapterModel.PATH)
         const mainQuery =
            !!byExternalId && id
               ? query(chaptersRef, where(byExternalId, '==', id), orderBy('chapterSequence'))
               : query(chaptersRef, orderBy('chapterSequence'))
         ChapterModel.listenToQuery(mainQuery, setChapters)
      }
   }

   const lessonsState = useSelector(getLessonsState)
   const setLessonsState = async function (id?: string, byExternalId?: 'courseId' | 'chapterId') {
      const setLessons = (lessons: LessonModel[]) => {
         dispatch(rescueLessonsState(lessons))
      }
      if (id && !byExternalId) {
         const data = await LessonModel.find(id)
         data && setLessons([data])
      } else {
         const lessonsRef = collection(db, LessonModel.PATH)
         const mainQuery =
            !!byExternalId && id
               ? query(lessonsRef, where(byExternalId, '==', id), orderBy('lessonSequence'))
               : query(lessonsRef, orderBy('lessonSequence'))
         LessonModel.listenToQuery(mainQuery, setLessons)
      }
   }

   const lessonsCompletionState = useSelector(getLessonsCompletionState)
   const setLessonsCompletionState = async function (
      userId: string,
      lessonId?: string,
      chapterId?: string,
      courseId?: string
   ) {
      const setLessonsCompletion = (lessonsCompletion: LessonsCompletionModel[]) => {
         dispatch(rescueLessonsCompletionState(lessonsCompletion))
      }
      const lessonsCompletionRef = collection(db, LessonsCompletionModel.PATH)
      const partialQuery = query(lessonsCompletionRef, orderBy('completionDate'))
      if (!!userId && !!lessonId) {
         const mainQuery = query(
            partialQuery,
            where('userId', '==', userId),
            where('lessonId', '==', lessonId)
         )
         LessonsCompletionModel.listenToQuery(mainQuery, setLessonsCompletion)
      } else if (!!userId && !!chapterId) {
         const mainQuery = query(
            partialQuery,
            where('userId', '==', userId),
            where('courseId', '==', chapterId)
         )
         LessonsCompletionModel.listenToQuery(mainQuery, setLessonsCompletion)
      } else if (!!userId && !!courseId) {
         const mainQuery = query(
            partialQuery,
            where('userId', '==', userId),
            where('courseId', '==', courseId)
         )
         LessonsCompletionModel.listenToQuery(mainQuery, setLessonsCompletion)
      } else if (!!userId) {
         const mainQuery = query(partialQuery, where('userId', '==', userId))
         LessonsCompletionModel.listenToQuery(mainQuery, setLessonsCompletion)
      }
   }

   useEffect(() => {
      setCategoriesState()
      setCoursesState()
   }, [])

   return {
      categoriesState,
      setCategoriesState,
      coursesState,
      setCoursesState,
      chaptersState,
      setChaptersState,
      lessonsState,
      setLessonsState,
      lessonsCompletionState,
      setLessonsCompletionState,
   }
}
