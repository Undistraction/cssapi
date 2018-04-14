import {
  lensProp,
  over,
  __,
  keys,
  when,
  map,
  without,
  pipe,
  mergeDeepRight,
  prop,
  has,
} from 'ramda'
import { isString, isNotUndefined, isUndefined } from 'ramda-adjunct'
import { splitOnColon } from '../utils/formatting'
import { CONFIG_FIELD_NAMES } from '../const'
import { lData, pScopes } from '../utils/config'
import { isNameValue, isCSSFunction } from '../utils/predicate'
import { propFlipped } from '../utils/objects'
import {
  throwDataError,
  unrecognisedDataPrefixError,
  missingDataNodeError,
  missingDataItemKeyError,
} from '../errors'
import { reduceWithKeys } from '../utils/list'
import { transformFunctionElements } from '../utils/css'

const { SCOPES } = CONFIG_FIELD_NAMES

const dataNameMappings = {
  c: `color`,
}

const lookupMapping = propFlipped(dataNameMappings)

const expandItem = data => value => {
  if (isNameValue(value)) {
    const [prefix, keyName] = splitOnColon(value)
    const dataNodeName = has(prefix, data) ? prefix : lookupMapping(prefix)
    if (isUndefined(dataNodeName))
      throwDataError(
        unrecognisedDataPrefixError(prefix, keys(dataNameMappings))
      )

    const dataNode = prop(dataNodeName, data)
    if (isUndefined(dataNode))
      throwDataError(missingDataNodeError(dataNodeName))

    const resolvedValue = prop(keyName, dataNode)
    if (isUndefined(resolvedValue))
      throwDataError(missingDataItemKeyError(dataNodeName, keyName))
    return expandItem(data)(resolvedValue)
  } else if (isCSSFunction(value)) {
    return transformFunctionElements(map(expandItem(data)))(value)
  }

  return value
}

const expandDataItemTokens = (name, expandedRootDataItem = {}) =>
  reduceWithKeys((acc, key) => {
    const mergedDataForKey = over(
      lensProp(name),
      mergeDeepRight(acc),
      expandedRootDataItem
    )
    return over(lensProp(key), when(isString, expandItem(mergedDataForKey)))(
      acc
    )
  })

const expandDataItems = (expandedRootData = {}) =>
  reduceWithKeys((acc, key) =>
    pipe(expandDataItemTokens, over(lensProp(key), __, acc))(
      key,
      expandedRootData
    )
  )

const expandScopes = expandedRootData =>
  map(over(lData, expandDataItems(expandedRootData)))

const expand = data => {
  const expandedRootData = pipe(without(SCOPES), expandDataItems(data))(data)

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
