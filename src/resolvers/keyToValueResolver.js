import { contains, defaultTo, find, lensProp, pipe, prop, when } from 'ramda'
import { isUndefined, lensSatisfies } from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT_NAME } from '../const/breakpoints'
import { CONFIG_FIELD_NAMES } from '../const/config'
import { missingDataNodeError, throwDataError } from '../errors'
import { hasNoScopes, isDefaultBreakpoint } from '../utils/predicate'

const { SCOPES, DATA, RESOLVE } = CONFIG_FIELD_NAMES

const findScope = data => breakpointName =>
  pipe(
    prop(SCOPES),
    find(lensSatisfies(contains(breakpointName), lensProp(RESOLVE))),
    prop(DATA)
  )(data)

const resolveScope = (breakpointName, dataPropName) => data => {
  if (isDefaultBreakpoint(breakpointName) || hasNoScopes(data)) {
    return prop(dataPropName, data)
  }
  return pipe(
    findScope(data),
    prop(dataPropName),
    defaultTo(prop(dataPropName, data))
  )(breakpointName)
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
