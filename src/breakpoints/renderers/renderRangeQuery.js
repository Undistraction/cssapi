import { nth, pipe } from 'ramda'
import { applyOffsetToBreakpointValue } from '../../utils/range'

const renderRangeQuery = (_, firstRangeItem, firstItemValue, range) => {
  const secondItemValue = pipe(nth(1), applyOffsetToBreakpointValue)(range)
  return firstItemValue === 0
    ? { to: secondItemValue }
    : { from: firstItemValue, to: secondItemValue }
}

export default renderRangeQuery
