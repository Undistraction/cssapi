import {
  compose,
  equals,
  find,
  last,
  head,
  prepend,
  unless,
  either,
  lensPath,
  curry,
} from 'ramda'
import { stubString, isEmptyArray, lensEq } from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT_NAME } from '../const/breakpoints'

export const findBreakpointByName = (breakpointMap, name) =>
  compose(last, find(compose(equals(name), head)))(breakpointMap, name)

const hasDefaultBreakpoint = lensEq(lensPath([0, 0]), DEFAULT_BREAKPOINT_NAME)

const addDefaultBreakpoint = prepend([DEFAULT_BREAKPOINT_NAME, stubString()])

export const ensureBreakpointMapHasDefault = unless(
  either(isEmptyArray, hasDefaultBreakpoint),
  addDefaultBreakpoint
)

export const createBreakpointMapping = curry((name, query, value) => ({
  name,
  query,
  value,
}))
