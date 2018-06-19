import { isDefaultBreakpoint } from '../../utils/predicate'

const renderGtQuery = (breakpointMap, rangeItem, rangeItemValue) =>
  isDefaultBreakpoint(rangeItem.name) ? {} : { from: rangeItemValue }

export default renderGtQuery
