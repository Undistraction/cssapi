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
  defaultTo,
  mergeDeepRight,
  prop,
} from 'ramda'
import { isString, isNotUndefined } from 'ramda-adjunct'
import { replaceTokens } from '../utils/formatting'
import { CONFIG_FIELD_NAMES } from '../const'
import { lData, pScopes } from '../utils/config'

const { SCOPES } = CONFIG_FIELD_NAMES

const expandDataItemTokens = (expandedRootDataItem = {}) =>
  converge(
    reduce((acc, key) =>
      over(
        lensProp(key),
        when(
          isString,
          replaceTokens(__, mergeDeepRight(expandedRootDataItem, acc))
        )
      )(acc)
    ),
    [identity, keys]
  )

const expandDataItems = expandedRootData =>
  converge(
    reduce((acc, key) =>
      over(lensProp(key), expandDataItemTokens(prop(key, expandedRootData)))(
        acc
      )
    ),
    [identity, keys]
  )

const expandScopes = expandedRootData =>
  map(over(lData, expandDataItems(expandedRootData)))

const expand = data => {
  const expandedRootData = pipe(without(SCOPES), expandDataItems({}))(data)
  const expandedScopeData = pipe(
    pScopes,
    when(isNotUndefined, expandScopes(expandedRootData)),
    defaultTo([])
  )(data)

  return {
    ...expandedRootData,
    [SCOPES]: expandedScopeData,
  }
}

const expandData = over(lData, expand)

export default expandData
