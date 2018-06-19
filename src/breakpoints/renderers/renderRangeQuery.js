import { nth, pipe } from 'ramda'
import createQueryDescriptor from '../../objects/queryDescriptor'
import { applyOffsetToBreakpointValue } from '../../utils/range'

const renderRangeQuery = (_, firstRangeItem, firstItemValue, range) => {
  const secondItemValue = pipe(nth(1), applyOffsetToBreakpointValue)(range)
  return createQueryDescriptor({ from: firstItemValue, to: secondItemValue })
}

export default renderRangeQuery
