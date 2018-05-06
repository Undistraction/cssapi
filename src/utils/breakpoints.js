import {
  compose,
  curry,
  equals,
  find,
  head,
  last,
  lensPath,
  prepend,
  unless,
} from 'ramda'
import { lensEq, stubString } from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT_NAME } from '../const/breakpoints'

export const findBreakpointByName = (breakpointMap, name) =>
  compose(last, find(compose(equals(name), head)))(breakpointMap, name)

const hasDefaultBreakpoint = lensEq(lensPath([0, 0]), DEFAULT_BREAKPOINT_NAME)

const addDefaultBreakpoint = prepend([DEFAULT_BREAKPOINT_NAME, stubString()])

export const ensureBreakpointMapHasDefault = unless(
  hasDefaultBreakpoint,
  addDefaultBreakpoint
)

export const createBreakpointMapping = curry((name, query, value) => ({
  name,
  query,
  value,
}))
