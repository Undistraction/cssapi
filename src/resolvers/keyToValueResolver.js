import { pipe, prop, when, find, has, contains, lensProp } from 'ramda'
import { isUndefined, isNotUndefined, lensSatisfies } from 'ramda-adjunct'
import { throwDataError, missingDataNodeError } from '../errors'
import { DEFAULT_BREAKPOINT } from '../const'
import { isDefaultBreakpoint } from '../utils/predicate'

const findScope = (data, breakpointName) =>
  pipe(
    prop(`scopes`),
    find(lensSatisfies(contains(breakpointName), lensProp(`resolve`))),
    prop(`data`)
  )(data)

const hasAvailableScopes = has(`scopes`)

const resolveScope = (breakpointName, dataPropName) => data => {
  if (isDefaultBreakpoint(breakpointName) || !hasAvailableScopes(data)) {
    return prop(dataPropName, data)
  }

  const scope = findScope(data, breakpointName)
  if (isNotUndefined(scope)) {
    const v = prop(dataPropName, scope)
    if (v) return v
  }
  return prop(dataPropName, data)
}

const keyToValueResolver = dataPropName => (
  value,
  data,
  breakpointName = DEFAULT_BREAKPOINT
) =>
  pipe(
    resolveScope(breakpointName, dataPropName),
    when(isUndefined, () => throwDataError(missingDataNodeError(dataPropName)))
  )(data)

export default keyToValueResolver
