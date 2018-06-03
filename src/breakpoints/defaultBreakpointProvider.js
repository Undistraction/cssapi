import {
  __,
  adjust,
  append,
  apply,
  compose,
  equals,
  find,
  identity,
  last,
  lensIndex,
  map,
  nth,
  pipe,
  unless,
  useWith,
  when,
} from 'ramda'
import {
  appendFlipped,
  isNotUndefined,
  lensSatisfies,
  list,
  mapIndexed,
  reduceIndexed,
} from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT_NAME } from '../../lib/const/breakpoints'
import {
  noBreakpointAtIndexError,
  noBreakpointWithNameError,
  throwWhenUndefined,
} from '../errors'
import lengthToEmsTransformer from '../transformers/lengthToEmsTransformer'
import { createBreakpointMapping } from '../utils/breakpoints'
import { defaultToObj } from '../utils/functions'
import { numKeys } from '../utils/list'
import { reduceObjIndexed } from '../utils/objects'
import { isMediaQueryString } from '../utils/predicate'
import {
  createQueryMaxHeaderFromTemplate,
  createQueryMinHeaderFromTemplate,
  createQueryMinMaxHeaderFromTemplate,
} from '../utils/templates'
import { transformValue } from '../utils/transformers'

const createQuery = pipe(
  // Note: When using Ems for media queries the base font-size will always be
  // equivalent to 16px so we can safely hardcode here without pulling in the
  // value from config.data
  transformValue(lengthToEmsTransformer, __, { baseFontSize: 16 }, null)
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

const templateForQuery = (name, idx, mappedValues) => {
  if (idx < mappedValues.length - 1) {
    if (name === DEFAULT_BREAKPOINT_NAME) {
      return createQueryMaxHeaderFromTemplate(mappedValues[idx + 1][1])
    }
    return createQueryMinMaxHeaderFromTemplate(mappedValues[idx + 1][1])
  }
  return name === DEFAULT_BREAKPOINT_NAME
    ? () => null
    : createQueryMinHeaderFromTemplate
}

// export const splitToModifiers = s => {

//   if(a[0] === '>') s = tail(s)
//   if(a[0] === `<`)

//   // Splitting
//   // If the first char is > we can remove it - it is just there for consistency
//   // If the first char is < we know there is only one item so we remove it and generate a max-width query.

//   // Otherwise we try a split on <
//   // If this leaves us with two items we know we have a range so generate a min-max width query
//   // if this leaves us with only one item we generate a min-width query

//   // Parsing
//   // try a regexp looking for +/-n
//   // If found, we split the value into [name, modifier]
//   // We lookup the name and check it is valid
//   // we then apply the modifier
//   // We name the query using the modifer to make sure there is no collision

// }

const createApi = breakpointMap => {
  // Resolve breakpoints for values declared using an object syntax
  const byName = values => {
    // Explode values
    // Can't use raw name in case modified so decompose each value into parts
    // array
    // 1. name
    // 2. modifier function
    // 3.
    const mappedValues = reduceObjIndexed(
      (mappings, [name, value]) =>
        pipe(
          findBreakpointByName,
          throwWhenUndefined(noBreakpointWithNameError(name)),
          name === DEFAULT_BREAKPOINT_NAME
            ? () => null
            : createQueryMinHeaderFromTemplate,
          createBreakpointMapping(name, __, value),
          appendFlipped(mappings)
        )(name, breakpointMap),
      [],
      values
    )
    return mappedValues
  }

  // Resolve breakpoints for values declared using an array syntax
  const byIndex = values => {
    const mappedValues = reduceIndexed(
      (mappings, value, idx) =>
        pipe(
          findBreakpointByIndex,
          throwWhenUndefined(noBreakpointAtIndexError(idx)),
          append(value),
          appendFlipped(mappings)
        )(idx, breakpointMap),
      [],
      values
    )
    return mapIndexed((v, idx) => {
      // decide on the correct template to use
      const templateFunction = templateForQuery(v[0], idx, mappedValues)

      const result = pipe(
        adjust(templateFunction, 1),
        apply(createBreakpointMapping)
      )(v)
      return result
    }, mappedValues)
  }

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
