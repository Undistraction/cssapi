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
  append,
  when,
  lensIndex,
  equals,
} from 'ramda'
import {
  list,
  appendFlipped,
  reduceIndexed,
  isUndefined,
  lensSatisfies,
  isNotUndefined,
} from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import lengthToEmsTransformer from '../transformers/lengthToEmsTransformer'
import { transformValue } from '../utils/transformers'
import { createBreakpointMapping } from '../utils/breakpoints'
import { isMediaQueryString } from '../utils/predicate'
import { createQueryHeaderFromTemplate } from '../utils/templates'
import { noBreakpointAtIndexError, noBreakpointWithNameError } from '../errors'

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
        when(isUndefined, () => {
          throw noBreakpointWithNameError(name)
        }),
        createBreakpointMapping(name, __, value),
        appendFlipped(mappings)
      )(name, breakpointMap),
    []
  )

  const byIndex = reduceIndexed(
    (mappings, value, idx) =>
      pipe(
        findBreakpointByIndex,
        when(isUndefined, () => {
          throw noBreakpointAtIndexError(idx)
        }),
        append(value),
        apply(createBreakpointMapping),
        appendFlipped(mappings)
      )(idx, breakpointMap),
    []
  )

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
