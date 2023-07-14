import CategoryModel from '@/models/CategoryModel'
import ChapterModel from '@/models/ChapterModel'
import CourseModel from '@/models/CourseModel'
import LessonModel from '@/models/LessonModel'
import { Category, Course, Chapter, Lesson } from '@/models/interfaces'

interface FbSaveMethod {
   save(): Promise<void>
}

class CourseService {
   public async saveCourse(course: Omit<Course, 'id'>) {
      await this.saveContent(course, CourseModel)
   }

   public async saveCategory(category: Omit<Category, 'id'>) {
      await this.saveContent(category, CategoryModel)
   }

   public async saveChapter(chapter: Omit<Chapter, 'id'>) {
      await this.saveContent(chapter, ChapterModel)
   }

   public async saveLesson(lesson: Omit<Lesson, 'id'>) {
      await this.saveContent(lesson, LessonModel)
   }

   private async saveContent<T, G extends FbSaveMethod>(
      content: Omit<T, 'id'>,
      ClassConstructor: new (data: Omit<T, 'id'>) => G
   ) {
      const contentClass = new ClassConstructor(content)
      await contentClass.save()
   }
}

export default CourseService
