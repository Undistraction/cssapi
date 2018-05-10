import {
  append,
  contains,
  defaultTo,
  filter,
  isNil,
  lensProp,
  map,
  merge,
  pipe,
  prop,
  reduce,
  reduced,
  reverse,
  when,
} from 'ramda'
import { isObject, isUndefined, lensSatisfies } from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT_NAME } from '../const/breakpoints'
import { CONFIG_FIELD_NAMES } from '../const/config'
import { missingDataNodeError, throwDataError } from '../errors'
import { hasNoScopes, isDefaultBreakpoint } from '../utils/predicate'

const { SCOPES, DATA, RESOLVE } = CONFIG_FIELD_NAMES

const findResolvingScopes = (breakpointName, data) =>
  pipe(
    prop(SCOPES),
    filter(lensSatisfies(contains(breakpointName), lensProp(RESOLVE))),
    map(prop(DATA)),
    reverse,
    append(data)
  )(data)

const findDataPropOnScopes = (data, dataPropName) => breakpointName => {
  // Get scopes that resolve to this breakpoint
  // This will include the default in last position
  const resolvingScopes = findResolvingScopes(breakpointName, data)
  // Run through those scopes in reverse order, starting with the last and
  // ending witht the default, looking for the value.
  return reduce(
    (acc, scopeData) => {
      const value = prop(dataPropName, scopeData)
      if (isNil(value)) {
        // Acc will either be our fully resolved object, or null
        return acc
      }
      // If it is an object, we need to run through all scopes as some of its
      // properties might have been defined on an earlier scope.
      if (isObject(value)) {
        if (isObject(acc)) {
          // Merge any props that don't already exist on the object
          return merge(value, acc)
        }
        // Save the object so we can keep looking for its props
        return value
      }
      // If the value isn't an object then we have found our result.
      return reduced(value)
    },
    null,
    resolvingScopes
  )
}

const findDataProp = (breakpointName, dataPropName) => data => {
  // Optimise for early exit
  if (isDefaultBreakpoint(breakpointName) || hasNoScopes(data)) {
    return prop(dataPropName, data)
  }
  return pipe(
    findDataPropOnScopes(data, dataPropName),
    defaultTo(prop(dataPropName, data))
  )(breakpointName)
}

const keyToValueResolver = dataPropName => (
  value,
  data,
  breakpointName = DEFAULT_BREAKPOINT_NAME
) =>
  pipe(
    findDataProp(breakpointName, dataPropName),
    when(isUndefined, () => throwDataError(missingDataNodeError(dataPropName)))
  )(data)
export default keyToValueResolver
