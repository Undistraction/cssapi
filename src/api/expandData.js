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
  assoc,
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

const expandData = config => {
  const resolveDataAlias = propFlipped(config.dataAliases)

  // ---------------------------------------------------------------------------
  // Data Node Items
  // ---------------------------------------------------------------------------

  const expandDataNodeItems = sourceData => dataNodeItems =>
    // eslint-disable-next-line no-use-before-define
    map(expandDataNodeItem(sourceData))(dataNodeItems)

  const expandDataNodeItem = sourceData => dataNodeItem => {
    if (isNameValue(dataNodeItem)) {
      const [prefix, keyName] = splitOnColon(dataNodeItem)
      const dataNodeName = has(prefix, sourceData)
        ? prefix
        : resolveDataAlias(prefix)

      if (isUndefined(dataNodeName))
        throwDataError(
          unrecognisedDataPrefixError(prefix, keys(config.dataAliases))
        )

      const dataNode = prop(dataNodeName, sourceData)
      if (isUndefined(dataNode))
        throwDataError(missingDataNodeError(dataNodeName))

      const resolvedValue = prop(keyName, dataNode)
      if (isUndefined(resolvedValue))
        throwDataError(missingDataItemKeyError(dataNodeName, keyName))

      return expandDataNodeItem(sourceData)(resolvedValue)
    } else if (isCSSFunction(dataNodeItem)) {
      return transformFunctionElements(expandDataNodeItems(sourceData))(
        dataNodeItem
      )
    }
    return dataNodeItem
  }

  // -----------------------------------------------------------------------------
  // Data Nodes
  // -----------------------------------------------------------------------------

  const expandDataNode = (name, expandedRootDataItem = {}) =>
    reduceWithKeys((dataNodeItem, key) => {
      const sourceData = over(
        lensProp(name),
        mergeDeepRight(dataNodeItem),
        expandedRootDataItem
      )
      return over(
        lensProp(key),
        when(isString, expandDataNodeItem(sourceData))
      )(dataNodeItem)
    })

  const expandDataNodes = (expandedRootData = {}) =>
    reduceWithKeys((acc, key) =>
      pipe(expandDataNode, over(lensProp(key), __, acc))(key, expandedRootData)
    )

  // -----------------------------------------------------------------------------
  // Scopes
  // -----------------------------------------------------------------------------

  const expandScopes = expandedRootData =>
    map(over(lData, expandDataNodes(expandedRootData)))

  // -----------------------------------------------------------------------------
  // Data
  // -----------------------------------------------------------------------------

  const expandDataImp = data => {
    const expandedRootData = pipe(without(SCOPES), expandDataNodes(data))(data)

    const expandedScopeData = pipe(
      pScopes,
      when(isNotUndefined, expandScopes(expandedRootData))
    )(data)

    return assoc(SCOPES, expandedScopeData)(expandedRootData)
  }

  return over(lData, expandDataImp, config)
}

export default expandData
