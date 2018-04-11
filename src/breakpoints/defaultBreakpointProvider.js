import {
  map,
  useWith,
  identity,
  apply,
  compose,
  find,
  last,
  pipe,
  __,
} from 'ramda'
import { list, appendFlipped, reduceIndexed } from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import { headEquals, nthFlipped } from '../utils/list'
import { replaceToken } from '../utils/formatting'
import { QUERY_TEMPLATE } from '../const'
import lengthToEmsTransformer from '../transformers/lengthToEmsTransformer'
import { transformValue } from '../utils/transformers'
import { createBreakpointMapping } from '../utils/breakpoints'

const createQuery = pipe(
  transformValue(lengthToEmsTransformer, __, {}, null),
  replaceToken(QUERY_TEMPLATE, `minWidth`)
)

const createQueries = map(apply(useWith(list, [identity, createQuery])))

const defaultBreakpointMapProvider = (o = {}) => {
  const breakpointMap = createQueries(o)

  const findBreakpointByIndex = nthFlipped(breakpointMap)

  const findBreakpointByName = name =>
    compose(last, find(headEquals(name)))(breakpointMap)

  const byName = reduceObjIndexed((acc, [name, value]) => {
    const query = findBreakpointByName(name)
    const breakpointMapping = createBreakpointMapping(name, query, value)
    return appendFlipped(acc, breakpointMapping)
  }, [])

  const byIndex = reduceIndexed((acc, value, idx) => {
    const breakpointMapping = createBreakpointMapping(
      ...findBreakpointByIndex(idx),
      value
    )
    return appendFlipped(acc, breakpointMapping)
  }, [])

  return {
    byIndex,
    byName,
  }
}

export default defaultBreakpointMapProvider
