import { createQueryMaxHeaderFromTemplate } from '../../utils/templates'

const renderLtQuery = (breakpointMap, rangeItem, rangeItemValue) =>
  createQueryMaxHeaderFromTemplate(rangeItemValue)

export default renderLtQuery
