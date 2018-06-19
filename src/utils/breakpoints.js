import {
  apply,
  identity,
  map,
  pipe,
  prepend,
  split,
  unless,
  useWith,
} from 'ramda'
import { list } from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT_NAME, LT_MODIFIER } from '../const/breakpoints'
import { invalidBreakpointSyntaxError } from '../errors'
import createBreakpointDescriptor from '../objects/breakpointDescriptor'
import rootPxToEmTransformer from '../transformers/rootPxToEmTransformer'
import { isEmString, isRange, isValidModifiedMq } from './predicate'
import { createRangeItem } from './range'

export const addDefaultBreakpoint = prepend([DEFAULT_BREAKPOINT_NAME, 0])

export const parseBreakpoint = value => {
  if (!isValidModifiedMq(value)) {
    throw Error(invalidBreakpointSyntaxError(value))
  }

  // A range will always have a < in a position greater than 0
  if (!isRange(value)) {
    // It's a single item
    const rangeItem = createRangeItem(value)
    return createBreakpointDescriptor(value, rangeItem)
  }

  // Otherwise it's a range (containing two items)
  return pipe(
    split(LT_MODIFIER),
    map(createRangeItem),
    createBreakpointDescriptor(value)
  )(value)
}

export const breakpointValuesToEms = map(
  apply(useWith(list, [identity, unless(isEmString, rootPxToEmTransformer)]))
)
