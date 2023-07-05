import CategoryModel from '@/models/CategoryModel'
import CourseModel from '@/models/CourseModel'
import { Category, Course } from '@/models/interfaces'

class CourseService {
   public async saveCourse(course: Omit<Course, 'id'>) {
      const courseClass = new CourseModel(course)
      await courseClass.save()
   }

   public async saveCategory(category: Omit<Category, 'id'>) {
      const categoryClass = new CategoryModel(category)
      await categoryClass.save()
   }
}

export default CourseService
