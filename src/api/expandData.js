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
  mergeDeepRight,
  prop,
} from 'ramda'
import { isString, isNotUndefined } from 'ramda-adjunct'
import { replaceTokens } from '../utils/formatting'
import { CONFIG_FIELD_NAMES } from '../const'
import { lData, pScopes } from '../utils/config'

const { SCOPES } = CONFIG_FIELD_NAMES

const reduceWithKeys = reducer => converge(reduce(reducer), [identity, keys])

const expandDataItemTokens = (expandedRootDataItem = {}) =>
  reduceWithKeys((acc, key) => {
    const mergedDataForKey = mergeDeepRight(expandedRootDataItem, acc)
    return over(
      lensProp(key),
      when(isString, replaceTokens(__, mergedDataForKey))
    )(acc)
  })

const expandDataItems = (expandedRootData = {}) =>
  reduceWithKeys((acc, key) =>
    pipe(prop(key), expandDataItemTokens, over(lensProp(key), __, acc))(
      expandedRootData
    )
  )

const expandScopes = expandedRootData =>
  map(over(lData, expandDataItems(expandedRootData)))

const expand = data => {
  const expandedRootData = pipe(without(SCOPES), expandDataItems())(data)

  const expandedScopeData = pipe(
    pScopes,
    when(isNotUndefined, expandScopes(expandedRootData))
  )(data)

  return {
    ...expandedRootData,
    [SCOPES]: expandedScopeData,
  }
}

const expandData = over(lData, expand)

export default expandData
