import {
  any,
  both,
  cond,
  equals,
  head,
  isNil,
  of,
  pipe,
  prop,
  reject,
  split,
  T,
  tail,
  unless,
} from 'ramda'
import {
  MODIFIERS,
  NEGATIVE_OFFSET,
  POSITIVE_OFFSET,
} from '../const/breakpoints'
import rootPxToEmTransformer from '../transformers/rootPxToEmTransformer'
import { propName, propValue } from './breakpointMapping'
import { addEmValues } from './parse'
import {
  hasNegativeOffset,
  hasPositiveOffset,
  isDefaultBreakpoint,
  isEmString,
} from './predicate'

export const propOffset = prop(`offset`)

const extractPositiveOffset = split(POSITIVE_OFFSET)

const extractNegativeOffset = v => {
  const [name, offset] = split(NEGATIVE_OFFSET, v)
  return [name, `-${offset}`]
}

const extractOffset = cond([
  [hasPositiveOffset, extractPositiveOffset],
  [hasNegativeOffset, extractNegativeOffset],
  [T, of],
])

const isDefaultWithNegativeOffset = both(
  pipe(propName, isDefaultBreakpoint),
  pipe(propOffset, hasNegativeOffset)
)

const firstCharIsModifier = value => any(equals(value[0]), MODIFIERS)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const createRangeItem = value => {
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

export const hasNoOffset = pipe(propOffset, isNil)

export const applyOffset = rangeItem =>
  pipe(
    propOffset,
    unless(isEmString, rootPxToEmTransformer),
    addEmValues(rangeItem.value)
  )

export const applyOffsetToBreakpointValue = rangeItem =>
  cond([
    [hasNoOffset, propValue],
    [isDefaultWithNegativeOffset, () => 0],
    [T, applyOffset(rangeItem)],
  ])(rangeItem)
