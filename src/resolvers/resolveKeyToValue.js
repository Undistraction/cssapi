import {
  always,
  append,
  cond,
  contains,
  defaultTo,
  either,
  filter,
  isNil,
  map,
  pipe,
  prop,
  reduce,
  reduced,
  reverse,
  T,
  when,
} from 'ramda'
import { isObject, lensSatisfies, mergeRight } from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT_NAME } from '../const/breakpoints'
import { missingDataNodeError, throwDataError } from '../errors'
import { lResolve, propData, propScopes } from '../objects/config'
import { whenIsUndefined } from '../utils/logic'
import { hasScopes, isNotDefaultBreakpoint } from '../utils/predicate'

const filterResolvingScopes = breakpointName =>
  filter(lensSatisfies(contains(breakpointName), lResolve))

// Find any scopes that resolve to this breakpoint, reversing them so that the
// final scope is first, adding the default scope in last position.
const findResolvingScopes = (breakpointName, data) =>
  pipe(
    propScopes,
    filterResolvingScopes(breakpointName),
    map(propData),
    reverse,
    append(data)
  )(data)

// Merge any props that don't already exist on the object
const resolveObject = acc => when(always(isObject(acc)), mergeRight(acc))

const findPropOnScope = dataPropName => (acc, scopeData) =>
  pipe(
    prop(dataPropName),
    cond([[isNil, always(acc)], [isObject, resolveObject(acc)], [T, reduced]])
  )(scopeData)

const findPropsOnScope = dataPropName =>
  reduce(findPropOnScope(dataPropName), null)

// Find any matching prop on this dataNode
const resolveScopes = (data, dataPropName) => breakpointName =>
  pipe(findResolvingScopes, findPropsOnScope(dataPropName))(
    breakpointName,
    data
  )

const shouldResolveScopes = data =>
  either(isNotDefaultBreakpoint, () => hasScopes(data))

const findDataProp = (breakpointName, dataPropName) => data =>
  pipe(
    // Try using scopes
    when(shouldResolveScopes(data), resolveScopes(data, dataPropName)),
    // Fall back to root
    defaultTo(prop(dataPropName, data))
  )(breakpointName)

const resolveKeyToValue = dataPropName => (
  value,
  data,
  breakpointName = DEFAULT_BREAKPOINT_NAME
) =>
  pipe(
    findDataProp(breakpointName, dataPropName),
    whenIsUndefined(() => throwDataError(missingDataNodeError(dataPropName)))
  )(data)

export default resolveKeyToValue
