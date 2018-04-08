import {
  lensProp,
  over,
  __,
  keys,
  reduce,
  converge,
  identity,
  when,
} from 'ramda'
import { isString } from 'ramda-adjunct'
import { replaceTokens } from '../utils/formatting'

const lData = lensProp(`data`)

const expandDataItemTokens = converge(
  reduce((acc, key) =>
    over(lensProp(key), when(isString, replaceTokens(__, acc)), acc)
  ),
  [identity, keys]
)

const expandDataItem = converge(
  reduce((acc, key) => over(lensProp(key), expandDataItemTokens, acc)),
  [identity, keys]
)

const expandData = over(lData, expandDataItem)

export default expandData
