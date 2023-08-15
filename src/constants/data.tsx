import ActiveCoursesSwiper from '@/components/ScrollableElement/CustomSwiper/ActiveCoursesSwiper'
import { CourseCreationType } from '@/models/interfaces'
import {
   BsFillCheckCircleFill,
   BsFillDashCircleFill,
   BsFillXCircleFill,
   BsFillExclamationCircleFill,
} from 'react-icons/bs'
import { ADMIN_SELECTED_SLIDER_CONTENT_ID } from './config'

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

interface SliderContent {
   id: string
   name: string
   component: React.JSX.Element
   sequence: number
}

export const SLIDER_CONTENT: SliderContent[] = [
   {
      id: 'L1w1CseCqsEChsqL6zOrylADsofw',
      name: 'Listagem de todos os cursos',
      component: <ActiveCoursesSwiper title='Cursos' cardFormat='vertical' />,
      sequence: 2,
   },
   {
      id: 'lmN6yjb0gXzPFwvesfPxDuqwDtHx',
      name: 'Listagem de todos os cursos novos',
      component: (
         <ActiveCoursesSwiper title='Cursos novos' cardFormat='vertical' courseListing='fresh' />
      ),
      sequence: 0,
   },
   {
      id: 'AlbkfVqwFLbsAaX0Rf53l1XRN7dS',
      name: 'Cursos selecionados',
      component: (
         <ActiveCoursesSwiper
            title='História (cursos selecionados)'
            cardFormat='vertical'
            courseListing='selected'
         />
      ),
      sequence: 3,
   },
   {
      id: 'x13fpjAbFlvQeoVEZfqGXoORvVH6',
      name: 'Cursos por tópico',
      component: (
         <ActiveCoursesSwiper
            title='[Nome do tópico]'
            cardFormat='vertical'
            courseListing='topic'
         />
      ),
      sequence: 4,
   },
   {
      id: 'HgakqlyjyNuj9iVaDHn9wVpIeZ5V',
      name: 'Listagem de todos os cursos',
      component: (
         <ActiveCoursesSwiper
            title='Cursos (menos os novos)'
            cardFormat='vertical'
            courseListing='old'
         />
      ),
      sequence: 1,
   },
]

// Constant for config
// After filter only selected slides will be displayed
export const FILTERED_SLIDER_CONTENT = SLIDER_CONTENT.sort(
   (a, b) => a.sequence - b.sequence
).filter((slider) => ADMIN_SELECTED_SLIDER_CONTENT_ID.includes(slider.id))
