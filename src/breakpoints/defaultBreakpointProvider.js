import {
  __,
  adjust,
  append,
  apply,
  compose,
  equals,
  find,
  flip,
  identity,
  last,
  lensIndex,
  map,
  nth,
  pipe,
  subtract,
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
import {
  noBreakpointAtIndexError,
  noBreakpointWithNameError,
  throwWhenUndefined,
} from '../errors'
import lengthToEmsTransformer from '../transformers/lengthToEmsTransformer'
import { createBreakpointMapping } from '../utils/breakpoints'
import { adjustNumberWithUnit } from '../utils/converters'
import { defaultToObj } from '../utils/functions'
import { numKeys } from '../utils/list'
import { reduceObjIndexed } from '../utils/objects'
import { isMediaQueryString } from '../utils/predicate'
import {
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

const createApi = breakpointMap => {
  // Resolve breakpoints for values declared using an object syntax
  const byName = reduceObjIndexed(
    (mappings, [name, value]) =>
      pipe(
        findBreakpointByName,
        throwWhenUndefined(noBreakpointWithNameError(name)),
        createQueryMinHeaderFromTemplate,
        createBreakpointMapping(name, __, value),
        appendFlipped(mappings)
      )(name, breakpointMap),
    []
  )

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
      const templateFunction =
        idx > 0 && idx < mappedValues.length - 1
          ? createQueryMinMaxHeaderFromTemplate(
              adjustNumberWithUnit(
                flip(subtract)(0.01),
                mappedValues[idx + 1][1]
              )
            )
          : createQueryMinHeaderFromTemplate

      return pipe(adjust(templateFunction, 1), apply(createBreakpointMapping))(
        v
      )
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
