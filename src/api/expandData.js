import {
  lensProp,
  over,
  __,
  keys,
  reduce,
  converge,
  identity,
  when,
  map,
  without,
  pipe,
  prop,
  defaultTo,
  mergeDeepRight,
} from 'ramda'
import { isString, isNotUndefined } from 'ramda-adjunct'
import { replaceTokens } from '../utils/formatting'
import { CONFIG_FIELD_NAMES } from '../const'

const { SCOPES, DATA } = CONFIG_FIELD_NAMES

const lData = lensProp(DATA)

const expandDataItemTokens = (dataItemDefaultValues = {}) =>
  converge(
    reduce((acc, key) =>
      over(
        lensProp(key),
        when(
          isString,
          replaceTokens(__, mergeDeepRight(dataItemDefaultValues, acc))
        )
      )(acc)
    ),
    [identity, keys]
  )

const expandDataItems = dataDefaultValues =>
  converge(
    reduce((acc, key) =>
      over(lensProp(key), expandDataItemTokens(dataDefaultValues[key]))(acc)
    ),
    [identity, keys]
  )

const expand = data => {
  const expandedRoot = pipe(without(SCOPES), expandDataItems({}))(data)
  const expandedScopes = pipe(
    prop(SCOPES),
    when(
      isNotUndefined,
      map(over(lensProp(DATA), expandDataItems(expandedRoot)))
    ),
    defaultTo([])
  )(data)

  return {
    ...expandedRoot,
    [SCOPES]: expandedScopes,
  }
}

const expandData = over(lData, expand)

export default expandData
