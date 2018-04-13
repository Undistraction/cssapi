import { pipe, prop, when, find, contains, lensProp, defaultTo } from 'ramda'
import { isUndefined, lensSatisfies } from 'ramda-adjunct'
import { throwDataError, missingDataNodeError } from '../errors'
import { DEFAULT_BREAKPOINT_NAME, CONFIG_FIELD_NAMES } from '../const'
import { isDefaultBreakpoint, hasNoScopes } from '../utils/predicate'

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
