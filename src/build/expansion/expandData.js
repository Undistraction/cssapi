import {
  assoc,
  cond,
  identity,
  keys,
  lensProp,
  map,
  mergeDeepLeft,
  over,
  pipe,
  prop,
  T,
  when,
  without,
  __,
} from 'ramda'
import { concatRight, isNotUndefined, isString } from 'ramda-adjunct'
import CONFIG_FIELD_NAMES from '../../const/config'
import {
  missingDataItemKeyError,
  missingDataNodeError,
  throwDataError,
  unrecognisedDataPrefixError,
} from '../../errors'
import { lData, propScopes } from '../../objects/config'
import { splitOnColon } from '../../utils/formatting'
import { reduceWithKeys } from '../../utils/list'
import { whenIsUndefined } from '../../utils/logic'
import {
  hasUnnestedWhitespace,
  isCSSFunction,
  isToken,
} from '../../utils/predicate'
import {
  transformFunctionElements,
  transformGroup,
} from '../../utils/transformers'

const { SCOPES, ALIASES } = CONFIG_FIELD_NAMES

const validPrefixes = (config, data) =>
  pipe(
    keys,
    without([SCOPES, ALIASES]),
    concatRight(keys(config.data[ALIASES]))
  )(data)

const expandData = config => {
  // Build Function to resolve aliases
  const resolveDataAlias = (name, data) =>
    pipe(
      prop,
      whenIsUndefined(() => prop(name, config.data.aliases)),
      whenIsUndefined(() => {
        throwDataError(
          unrecognisedDataPrefixError(name, validPrefixes(config, data))
        )
      })
    )(name, data)

  // ---------------------------------------------------------------------------
  // Value Expansion
  // ---------------------------------------------------------------------------

  const resolveName = (sourceData, name, key) =>
    pipe(
      prop(name),
      whenIsUndefined(() => throwDataError(missingDataNodeError(name))),
      prop(key),
      whenIsUndefined(() => throwDataError(missingDataItemKeyError(name, key)))
    )(sourceData)

  const expandToken = sourceData => token => {
    const [prefix, key] = splitOnColon(token)
    const name = resolveDataAlias(prefix, sourceData)
    const value = resolveName(sourceData, name, key)
    // eslint-disable-next-line no-use-before-define
    return expandValue(sourceData)(value)
  }

  const expandValues = sourceData =>
    // eslint-disable-next-line no-use-before-define
    map(expandValue(sourceData))

  const expandValue = sourceData => v =>
    cond([
      [isToken, expandToken(sourceData)],
      [isCSSFunction, transformFunctionElements(expandValues(sourceData))],
      [hasUnnestedWhitespace, transformGroup(expandValue(sourceData))],
      [T, identity],
    ])(v)

  // ---------------------------------------------------------------------------
  // Node Expansion
  // ---------------------------------------------------------------------------

  const expandNode = (name, expandedRootData) =>
    reduceWithKeys((node, key) => {
      const sourceData = over(
        lensProp(name),
        mergeDeepLeft(node),
        expandedRootData
      )
      return over(lensProp(key), when(isString, expandValue(sourceData)))(node)
    })

  const expandNodes = expandedRootData =>
    reduceWithKeys((acc, name) =>
      pipe(expandNode, over(lensProp(name), __, acc))(name, expandedRootData)
    )

  // ---------------------------------------------------------------------------
  // Scopes
  // ---------------------------------------------------------------------------

  const expandScopes = expandedRootData =>
    map(over(lData, expandNodes(expandedRootData)))

  // ---------------------------------------------------------------------------
  // Data
  // ---------------------------------------------------------------------------

  const expand = data => {
    // Expand the root node using itself as a data source
    const expandedRootData = expandNodes(data)(data)

    // Expand scoped nodes
    return pipe(
      propScopes,
      when(isNotUndefined, expandScopes(expandedRootData)),
      assoc(SCOPES, __, expandedRootData)
    )(data)
  }

  return over(lData, expand, config)
}

export default expandData
