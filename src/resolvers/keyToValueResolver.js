import { pipe, prop, when, find, has, contains, lensProp } from 'ramda'
import { isUndefined, isNotUndefined, lensSatisfies } from 'ramda-adjunct'
import { throwDataError, missingDataNodeError } from '../errors'
import { DEFAULT_BREAKPOINT_NAME, CONFIG_FIELD_NAMES } from '../const'
import { isDefaultBreakpoint } from '../utils/predicate'

const { SCOPES, DATA, RESOLVE } = CONFIG_FIELD_NAMES

const findScope = (data, breakpointName) =>
  pipe(
    prop(SCOPES),
    find(lensSatisfies(contains(breakpointName), lensProp(RESOLVE))),
    prop(DATA)
  )(data)

const hasAvailableScopes = has(SCOPES)

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
  breakpointName = DEFAULT_BREAKPOINT_NAME
) =>
  pipe(
    resolveScope(breakpointName, dataPropName),
    when(isUndefined, () => throwDataError(missingDataNodeError(dataPropName)))
  )(data)

export default keyToValueResolver
