import {
  createQueryMaxHeaderFromTemplate,
  createQueryMinHeaderFromTemplate,
  createQueryMinMaxHeaderFromTemplate,
} from '../../../utils/templates'

const renderQueryHeader = ({ to, from }) => {
  if (from && to) {
    return createQueryMinMaxHeaderFromTemplate(to, from)
  }

  if (from) {
    return createQueryMinHeaderFromTemplate(from)
  }

  return createQueryMaxHeaderFromTemplate(to)
}

export default renderQueryHeader
