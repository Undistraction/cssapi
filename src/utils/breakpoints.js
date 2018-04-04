import { compose, equals, find, last, head, prepend, unless } from 'ramda'
import { stubString } from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT } from '../const'

export const findBreakpointByName = (breakpointMap, name) =>
  compose(last, find(compose(equals(name), head)))(breakpointMap, name)

const hasDefaultBreakpoint = compose(equals(DEFAULT_BREAKPOINT), head, head)
const addDefaultBreakpoint = prepend([DEFAULT_BREAKPOINT, stubString()])

export const ensureBreakpointMapHasDefault = unless(
  hasDefaultBreakpoint,
  addDefaultBreakpoint
)
