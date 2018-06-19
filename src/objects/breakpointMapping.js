import { assoc, curry, lensProp, prop } from 'ramda'
import FIELD_NAMES from '../const/breakpointMapping'

const { NAME, QUERY, VALUE } = FIELD_NAMES

export const propName = prop(NAME)
export const propValue = prop(VALUE)
export const propQuery = prop(QUERY)

export const lName = lensProp(NAME)
export const lQuery = lensProp(QUERY)

export const assocValue = assoc(VALUE)
export const assocQuery = assoc(QUERY)

export const createBreakpointMapping = curry((name, value, query) => ({
  name,
  query,
  value,
}))
