import {
  apply,
  curry,
  dec,
  equals,
  find,
  findIndex,
  flip,
  gt,
  identity,
  inc,
  insert,
  last,
  lensIndex,
  nth,
  pipe,
  prop,
  useWith,
} from 'ramda'
import { appendFlipped, lensSatisfies, reduceIndexed } from 'ramda-adjunct'
import {
  noBreakpointAtIndexError,
  noBreakpointWithNameError,
  throwWhenUndefined,
} from '../errors'
import { createBreakpointMapping } from './breakpointMapping'

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

const buildMapping = (breakpointMap, mappings, value) =>
  pipe(
    findBreakpointByIndex(breakpointMap),
    insert(1, value),
    apply(createBreakpointMapping),
    appendFlipped(mappings)
  )

export const buildMappingsByIndex = (breakpointMap, values) =>
  reduceIndexed(
    (mappings, value, idx) => buildMapping(breakpointMap, mappings, value)(idx),
    [],
    values
  )

export const isNotLastBreakpoint = useWith(gt, [
  pipe(prop(`length`), dec),
  identity,
])
