import { nth, pipe } from 'ramda'
import {
  findBreakpointIndex,
  findNextBreakpointByIndex,
  isNotLastBreakpoint,
} from '../../utils/breakpointMap'
import { isDefaultBreakpoint } from '../../utils/predicate'
import {
  createQueryMaxHeaderFromTemplate,
  createQueryMinHeaderFromTemplate,
  createQueryMinMaxHeaderFromTemplate,
} from '../../utils/templates'

const nextBreakpointByIndex = breakpointMap =>
  pipe(findNextBreakpointByIndex(breakpointMap), nth(1))

const renderAtQuery = (breakpointMap, rangeItem, rangeItemValue) => {
  // We need to limit ourselves using a max of the next query if it exists.
  // Use our own index to check if there is a breakpoint after us
  const idx = findBreakpointIndex(breakpointMap, rangeItem.name)

  if (isNotLastBreakpoint(breakpointMap, idx)) {
    // It does exist so get its value
    const nextBreakpointValue = nextBreakpointByIndex(breakpointMap)(idx)
    return isDefaultBreakpoint(rangeItem.name)
      ? createQueryMaxHeaderFromTemplate(nextBreakpointValue)
      : createQueryMinMaxHeaderFromTemplate(nextBreakpointValue, rangeItemValue)
  }
  // Otherwise we are the last breakpoint so we don't need a max
  return createQueryMinHeaderFromTemplate(rangeItemValue)
}

export default renderAtQuery
