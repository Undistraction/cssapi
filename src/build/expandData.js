import {
  T,
  __,
  assoc,
  concat,
  cond,
  has,
  identity,
  keys,
  lensProp,
  map,
  mergeDeepRight,
  over,
  pipe,
  prop,
  when,
  without,
} from 'ramda'
import { isNotUndefined, isString, isUndefined } from 'ramda-adjunct'
import { CONFIG_FIELD_NAMES } from '../const/config'
import {
  missingDataItemKeyError,
  missingDataNodeError,
  throwDataError,
  unrecognisedDataPrefixError,
} from '../errors'
import { lData, pScopes } from '../utils/config'
import {
  joinWithSpace,
  splitOnColon,
  splitOnUnnestedWhitespace,
} from '../utils/formatting'
import { reduceWithKeys } from '../utils/list'
import { propFlipped } from '../utils/objects'
import {
  hasUnnestedWhitespace,
  isCSSFunction,
  isToken,
} from '../utils/predicate'
import { transformFunctionElements } from '../utils/transformers'

const { SCOPES, ALIASES } = CONFIG_FIELD_NAMES

const expandData = config => {
  const resolveDataAlias = propFlipped(config.data.aliases)

  // ---------------------------------------------------------------------------
  // Data Node Items
  // ---------------------------------------------------------------------------

  const expandToken = sourceData => dataNodeItem => {
    const [prefix, keyName] = splitOnColon(dataNodeItem)
    const dataNodeName = has(prefix, sourceData)
      ? prefix
      : resolveDataAlias(prefix)
    if (isUndefined(dataNodeName)) {
      const availableKeys = without([SCOPES, ALIASES])(
        concat(keys(sourceData), keys(config.data[ALIASES]))
      )
      throwDataError(unrecognisedDataPrefixError(prefix, availableKeys))
    }
    const dataNode = prop(dataNodeName, sourceData)
    if (isUndefined(dataNode))
      throwDataError(missingDataNodeError(dataNodeName))

    const resolvedValue = prop(keyName, dataNode)
    if (isUndefined(resolvedValue))
      throwDataError(missingDataItemKeyError(dataNodeName, keyName))

    // eslint-disable-next-line no-use-before-define
    return expandDataNodeItem(sourceData)(resolvedValue)
  }

  const expandParts = sourceData => dataNodeItem =>
    pipe(
      splitOnUnnestedWhitespace,
      // eslint-disable-next-line no-use-before-define
      expandDataNodeItems(sourceData),
      joinWithSpace
    )(dataNodeItem)

  const expandDataNodeItems = sourceData => dataNodeItems =>
    // eslint-disable-next-line no-use-before-define
    map(expandDataNodeItem(sourceData))(dataNodeItems)

  const expandDataNodeItem = sourceData => dataNodeItem =>
    cond([
      [isToken, expandToken(sourceData)],
      [
        isCSSFunction,
        transformFunctionElements(expandDataNodeItems(sourceData)),
      ],
      [hasUnnestedWhitespace, expandParts(sourceData)],
      [T, identity],
    ])(dataNodeItem)

  // ---------------------------------------------------------------------------
  // Data Nodes
  // ---------------------------------------------------------------------------

  const expandDataNode = (dataNodeName, expandedRootDataItem = {}) =>
    reduceWithKeys((dataNodeItem, key) => {
      const sourceData = over(
        lensProp(dataNodeName),
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

  // ---------------------------------------------------------------------------
  // Scopes
  // ---------------------------------------------------------------------------

  const expandScopes = expandedRootData =>
    map(over(lData, expandDataNodes(expandedRootData)))

  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------

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
