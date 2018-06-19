import { nth, pipe } from 'ramda'
import {
  findBreakpointIndex,
  findNextBreakpointByIndex,
  isNotLastBreakpoint,
} from '../../utils/breakpointMap'

const nextBreakpointByIndex = breakpointMap =>
  pipe(findNextBreakpointByIndex(breakpointMap), nth(1))

const renderAtQuery = (breakpointMap, rangeItem, rangeItemValue) => {
  // We need to limit ourselves using a max of the next query if it exists.
  // Use our own index to check if there is a breakpoint after us
  const idx = findBreakpointIndex(breakpointMap, rangeItem.name)

  let nextBreakpointValue
  if (isNotLastBreakpoint(breakpointMap, idx)) {
    nextBreakpointValue = nextBreakpointByIndex(breakpointMap)(idx)
  }

  // Otherwise we are the last breakpoint so we don't need a max
  return { from: rangeItemValue, to: nextBreakpointValue }
}

export default renderAtQuery
