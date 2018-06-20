import { nth, pipe } from 'ramda'
import createQueryDescriptor from '../../objects/queryDescriptor'
import { applyOffsetToBreakpointValue } from '../../utils/range'

const createRangedQueryDescriptor = (
  _,
  firstRangeItem,
  firstItemValue,
  range
) => {
  const lastItemValue = pipe(nth(1), applyOffsetToBreakpointValue)(range)
  return createQueryDescriptor({ from: firstItemValue, to: lastItemValue })
}

export default createRangedQueryDescriptor
