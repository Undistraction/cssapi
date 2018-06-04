import {
  any,
  applySpec,
  compose,
  curry,
  equals,
  find,
  head,
  ifElse,
  indexOf,
  last,
  objOf,
  prepend,
  split,
  tail,
} from 'ramda'
import {
  DEFAULT_BREAKPOINT_NAME,
  LT_MODIFIER,
  MODIFIERS,
} from '../const/breakpoints'
import { invalidBreakpointSyntaxError } from '../errors'
import { isValidModifiedMq } from './predicate'

const firstCharIsModifier = value => any(equals(value[0]), MODIFIERS)

export const findBreakpointByName = (breakpointMap, name) =>
  compose(last, find(compose(equals(name), head)))(breakpointMap, name)

export const addDefaultBreakpoint = prepend([DEFAULT_BREAKPOINT_NAME, null])

export const createBreakpointMapping = curry((name, query, value) => ({
  name,
  query,
  value,
}))

export const parseBreakpoint = value => {
  if (!isValidModifiedMq(value)) {
    throw Error(invalidBreakpointSyntaxError(value))
  }

  // A range will always have a < in a position greater than 0
  if (indexOf(LT_MODIFIER, value) < 1) {
    // It's a single item
    const breakpoint = ifElse(
      firstCharIsModifier,
      applySpec({ name: tail, modifier: head }),
      objOf(`name`)
    )(value)

    return {
      name: value,
      range: [breakpoint],
    }
  }

  // Otherwise it's a range (containing two items)
  const values = split(LT_MODIFIER, value)
  const firstBreakpoint = values[0]
  const secondBreakpoint = values[1]
  const first = any(equals(firstBreakpoint[0]), MODIFIERS)
    ? { name: tail(firstBreakpoint), modifier: head(firstBreakpoint) }
    : { name: firstBreakpoint }
  const second = { name: secondBreakpoint }
  return { name: value, range: [first, second] }
}
