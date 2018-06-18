import {
  curry,
  dec,
  equals,
  find,
  findIndex,
  flip,
  gt,
  identity,
  inc,
  last,
  lensIndex,
  nth,
  pipe,
  prop,
  useWith,
} from 'ramda'
import { lensSatisfies } from 'ramda-adjunct'
import {
  noBreakpointAtIndexError,
  noBreakpointWithNameError,
  throwWhenUndefined,
} from '../errors'

export const findBreakpointByName = curry((breakpointMap, name) =>
  pipe(
    find(lensSatisfies(equals(name), lensIndex(0))),
    throwWhenUndefined(noBreakpointWithNameError(name)),
    last
  )(breakpointMap)
)

export const findBreakpointIndex = (breakpointMap, name) =>
  findIndex(lensSatisfies(equals(name), lensIndex(0)), breakpointMap)

export const findBreakpointByIndex = curry((breakpointMap, idx) =>
  pipe(
    flip(nth)(breakpointMap),
    throwWhenUndefined(noBreakpointAtIndexError(idx))
  )(idx)
)

export const findNextBreakpointByIndex = curry((breakpointMap, idx) =>
  pipe(inc, findBreakpointByIndex(breakpointMap))(idx)
)

export const isNotLastBreakpoint = useWith(gt, [
  pipe(prop(`length`), dec),
  identity,
])
