import {
  any,
  compose,
  equals,
  find,
  head,
  isNil,
  last,
  prepend,
  reject,
  split,
  tail,
} from 'ramda'
import {
  DEFAULT_BREAKPOINT_NAME,
  LT_MODIFIER,
  MODIFIERS,
  NEGATIVE_OFFSET,
  POSITIVE_OFFSET,
} from '../const/breakpoints'
import { invalidBreakpointSyntaxError } from '../errors'
import {
  hasNegativeOffset,
  hasPositiveOffset,
  isValidModifiedMq,
} from './predicate'
import { isRange } from './range'

const firstCharIsModifier = value => any(equals(value[0]), MODIFIERS)

export const findBreakpointByName = (breakpointMap, name) =>
  compose(last, find(compose(equals(name), head)))(breakpointMap, name)

export const addDefaultBreakpoint = prepend([DEFAULT_BREAKPOINT_NAME, 0])

const extractOffset = value => {
  if (hasPositiveOffset(value)) {
    return split(POSITIVE_OFFSET, value)
  }
  if (hasNegativeOffset(value)) {
    const [name, offset] = split(NEGATIVE_OFFSET, value)
    return [name, `-${offset}`]
  }
  return [value]
}

const createRangeItem = value => {
  const modifier = firstCharIsModifier(value) ? head(value) : null
  if (modifier) value = tail(value)

  const [name, offset] = extractOffset(value)

  const result = {
    name,
    offset,
    modifier,
  }

  return reject(isNil, result)
}

export const parseBreakpoint = value => {
  if (!isValidModifiedMq(value)) {
    throw Error(invalidBreakpointSyntaxError(value))
  }

  // A range will always have a < in a position greater than 0
  if (!isRange(value)) {
    // It's a single item
    return {
      name: value,
      range: [createRangeItem(value)],
    }
  }

  // Otherwise it's a range (containing two items)
  const values = split(LT_MODIFIER, value)
  const firstRangeItem = createRangeItem(values[0])
  const secondRangeItem = createRangeItem(values[1])
  return { name: value, range: [firstRangeItem, secondRangeItem] }
}
