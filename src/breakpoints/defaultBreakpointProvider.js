import {
  map,
  useWith,
  identity,
  apply,
  compose,
  find,
  last,
  append,
  pipe,
} from 'ramda'
import { stubArray, list, appendFlipped, reduceIndexed } from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import { headEquals, nthFlipped } from '../utils/list'
import { replaceToken } from '../utils/formatting'
import { QUERY_TEMPLATE } from '../const'
import lengthToEmsTransformer from '../transformers/lengthToEmsTransformer'
import { transformValue } from '../utils/transformers'

const buildQueries = map(
  apply(
    useWith(list, [
      identity,
      pipe(
        v => transformValue(lengthToEmsTransformer, v, {}, null),
        replaceToken(QUERY_TEMPLATE, `minWidth`)
      ),
    ])
  )
)

const defaultBreakpointMapProvider = (o = {}) => {
  const breakpointMap = buildQueries(o)

  const findBreakpointByIndex = nthFlipped(breakpointMap)

  const findBreakpointByName = name =>
    compose(last, find(headEquals(name)))(breakpointMap)

  const byName = reduceObjIndexed((acc, [name, value]) => {
    const query = findBreakpointByName(name)
    return append([name, query, value], acc)
  }, stubArray())

  const byIndex = reduceIndexed(
    (acc, value, idx) =>
      compose(appendFlipped(acc), list)(...findBreakpointByIndex(idx), value),
    stubArray()
  )

  return {
    byIndex,
    byName,
  }
}

export default defaultBreakpointMapProvider
