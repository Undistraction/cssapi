import { isDefaultBreakpoint } from '../../utils/predicate'
import { createQueryMinHeaderFromTemplate } from '../../utils/templates'

const renderGtQuery = (breakpointMap, rangeItem, rangeItemValue) =>
  isDefaultBreakpoint(rangeItem.name)
    ? null
    : createQueryMinHeaderFromTemplate(rangeItemValue)

export default renderGtQuery
