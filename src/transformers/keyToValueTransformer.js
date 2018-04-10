import { pipe, prop, when, isEmpty, find, has, contains, lensProp } from 'ramda'
import { isUndefined, isNotUndefined, lensSatisfies } from 'ramda-adjunct'
import {
  throwDataError,
  missingDataError,
  missingDataNodeError,
} from '../errors'
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

const keyToValueTransformer = dataPropName => (
  value,
  data,
  breakpointName = DEFAULT_BREAKPOINT
) =>
  pipe(
    resolveScope(breakpointName, dataPropName),
    when(isUndefined, () => throwDataError(missingDataNodeError(dataPropName))),
    when(isEmpty, () => throwDataError(missingDataError(dataPropName)))
  )(data)

export default keyToValueTransformer
