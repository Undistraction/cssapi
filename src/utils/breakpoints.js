import { compose, curry, equals, find, head, last, prepend } from 'ramda'
import { DEFAULT_BREAKPOINT_NAME } from '../const/breakpoints'

export const findBreakpointByName = (breakpointMap, name) =>
  compose(last, find(compose(equals(name), head)))(breakpointMap, name)

export const addDefaultBreakpoint = prepend([DEFAULT_BREAKPOINT_NAME, null])

export const createBreakpointMapping = curry((name, query, value) => ({
  name,
  query,
  value,
}))
