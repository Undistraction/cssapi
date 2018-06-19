import {
  createQueryMaxHeaderFromTemplate,
  createQueryMinHeaderFromTemplate,
} from '../../../lib/utils/templates'
import { createQueryMinMaxHeaderFromTemplate } from '../../utils/templates'

const renderHeader = ({ to, from }) => {
  if (from && to) {
    return createQueryMinMaxHeaderFromTemplate(to, from)
  }

  if (from) {
    return createQueryMinHeaderFromTemplate(from)
  }

  if (to) {
    return createQueryMaxHeaderFromTemplate(to)
  }

  return {}
}

export default renderHeader
