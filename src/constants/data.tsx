import { CourseCreationType } from '@/models/interfaces'
import {
   BsFillCheckCircleFill,
   BsFillDashCircleFill,
   BsFillXCircleFill,
   BsFillExclamationCircleFill,
} from 'react-icons/bs'

export const COURSE_STATUS_COMPONENTS = [
   {
      activation: 'creation' as CourseCreationType | 'courseless',
      text: 'Curso em criação',
      component: <BsFillDashCircleFill size={23} style={{ color: 'rgb(234,179,8)' }} />,
   },
   {
      activation: 'active' as CourseCreationType | 'courseless',
      text: 'Curso ativo',
      component: <BsFillCheckCircleFill size={23} style={{ color: 'rgb(34,197,94)' }} />,
   },
   {
      activation: 'inactive' as CourseCreationType | 'courseless',
      text: 'Curso inativo',
      component: <BsFillXCircleFill size={23} style={{ color: 'rgb(239,68,68)' }} />,
   },
   {
      activation: 'courseless' as CourseCreationType | 'courseless',
      text: 'Curso sem aulas',
      component: <BsFillExclamationCircleFill size={23} style={{ color: 'rgb(239,68,68)' }} />,
   },
]
