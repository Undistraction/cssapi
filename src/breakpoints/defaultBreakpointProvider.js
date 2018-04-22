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
  nth,
  append,
  when,
  lensIndex,
  equals,
} from 'ramda'
import {
  list,
  appendFlipped,
  reduceIndexed,
  lensSatisfies,
  isNotUndefined,
} from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import lengthToEmsTransformer from '../transformers/lengthToEmsTransformer'
import { transformValue } from '../utils/transformers'
import { createBreakpointMapping } from '../utils/breakpoints'
import { isMediaQueryString } from '../utils/predicate'
import { createQueryHeaderFromTemplate } from '../utils/templates'
import {
  noBreakpointAtIndexError,
  noBreakpointWithNameError,
  throwWhenUndefined,
} from '../errors'
import { defaultToObj } from '../utils/functions'
import { numKeys } from '../utils/list'

const createQuery = pipe(
  // Note: When using Ems for media queries the base font-size will always be
  // equivalent to 16px so we can safely hardcode here without pulling in the
  // value from config.data
  transformValue(lengthToEmsTransformer, __, { baseFontSize: 16 }, null),
  createQueryHeaderFromTemplate
)

const createQueryUnlessExists = unless(isMediaQueryString, createQuery)

const createQueries = map(
  apply(useWith(list, [identity, createQueryUnlessExists]))
)

const findBreakpointByName = (name, breakpointMap) =>
  compose(
    when(isNotUndefined, last),
    find(lensSatisfies(equals(name), lensIndex(0)))
  )(breakpointMap)

const findBreakpointByIndex = nth

const createApi = breakpointMap => {
  const byName = reduceObjIndexed(
    (mappings, [name, value]) =>
      pipe(
        findBreakpointByName,
        throwWhenUndefined(noBreakpointWithNameError(name)),
        createBreakpointMapping(name, __, value),
        appendFlipped(mappings)
      )(name, breakpointMap),
    []
  )

  const byIndex = reduceIndexed(
    (mappings, value, idx) =>
      pipe(
        findBreakpointByIndex,
        throwWhenUndefined(noBreakpointAtIndexError(idx)),
        append(value),
        apply(createBreakpointMapping),
        appendFlipped(mappings)
      )(idx, breakpointMap),
    []
  )

  const count = () => numKeys(breakpointMap)

  return {
    byIndex,
    byName,
    count,
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const defaultBreakpointMapProvider = pipe(
  defaultToObj,
  createQueries,
  createApi
)

export default defaultBreakpointMapProvider
