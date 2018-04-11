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
  unless,
  defaultTo,
  nth,
} from 'ramda'
import { list, appendFlipped, reduceIndexed } from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import { headEquals } from '../utils/list'
import { replaceToken } from '../utils/formatting'
import { QUERY_TEMPLATE } from '../const'
import lengthToEmsTransformer from '../transformers/lengthToEmsTransformer'
import { transformValue } from '../utils/transformers'
import { createBreakpointMapping } from '../utils/breakpoints'
import { isMediaQueryString } from '../utils/predicate'

const createQuery = pipe(
  transformValue(lengthToEmsTransformer, __, {}, null),
  replaceToken(QUERY_TEMPLATE, `minWidth`)
)

const createQueryUnlessExists = unless(isMediaQueryString, createQuery)

const createQueries = map(
  apply(useWith(list, [identity, createQueryUnlessExists]))
)

const findBreakpointByName = (name, breakpointMap) =>
  compose(last, find(headEquals(name)))(breakpointMap)

const findBreakpointByIndex = (index, breakpointMap) =>
  nth(index, breakpointMap)

const createApi = breakpointMap => {
  const byName = reduceObjIndexed((mappings, [name, value]) => {
    const query = findBreakpointByName(name, breakpointMap)
    const breakpointMapping = createBreakpointMapping(name, query, value)
    return appendFlipped(mappings, breakpointMapping)
  }, [])

  const byIndex = reduceIndexed((mappings, value, idx) => {
    const breakpointMapping = createBreakpointMapping(
      ...findBreakpointByIndex(idx, breakpointMap),
      value
    )
    return appendFlipped(mappings, breakpointMapping)
  }, [])

  return {
    byIndex,
    byName,
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const defaultBreakpointMapProvider = pipe(
  defaultTo({}),
  createQueries,
  createApi
)

export default defaultBreakpointMapProvider
