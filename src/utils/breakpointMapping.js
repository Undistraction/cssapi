import { assoc, curry, lensProp, prop } from 'ramda'

export const propName = prop(`name`)
export const propValue = prop(`value`)
export const propQuery = prop(`query`)
export const lName = lensProp(`name`)
export const lQuery = lensProp(`query`)
export const assocValue = assoc(`value`)
export const assocQuery = assoc(`query`)

export const createBreakpointMapping = curry((name, value, query) => ({
  name,
  query,
  value,
}))
