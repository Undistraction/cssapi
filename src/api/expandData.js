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

const lData = lensProp(`data`)

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
  const expandedRoot = pipe(without(`scopes`), expandDataItems({}))(data)
  const expandedScopes = pipe(
    prop(`scopes`),
    when(
      isNotUndefined,
      map(over(lensProp(`data`), expandDataItems(expandedRoot)))
    ),
    defaultTo([])
  )(data)

  return {
    ...expandedRoot,
    scopes: expandedScopes,
  }
}

const expandData = over(lData, expand)

export default expandData
