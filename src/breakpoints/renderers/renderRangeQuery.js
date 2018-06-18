import { nth, pipe } from 'ramda'
import { isDefaultBreakpoint } from '../../utils/predicate'
import { applyOffsetToBreakpointValue } from '../../utils/range'
import {
  createQueryMaxHeaderFromTemplate,
  createQueryMinMaxHeaderFromTemplate,
} from '../../utils/templates'

const renderRangeQuery = (_, firstRangeItem, firstItemValue, range) => {
  const secondItemValue = pipe(nth(1), applyOffsetToBreakpointValue)(range)
  return isDefaultBreakpoint(firstRangeItem.name) && firstItemValue === 0
    ? createQueryMaxHeaderFromTemplate(secondItemValue)
    : createQueryMinMaxHeaderFromTemplate(secondItemValue, firstItemValue)
}

export default renderRangeQuery
