import {
  __,
  adjust,
  append,
  apply,
  assoc,
  compose,
  curry,
  equals,
  find,
  findIndex,
  head,
  identity,
  last,
  lensIndex,
  map,
  nth,
  pipe,
  reduce,
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
import { lengthEq } from '../../lib/utils/list'
import {
  noBreakpointAtIndexError,
  noBreakpointWithNameError,
  throwWhenUndefined,
} from '../errors'
import lengthToEmsTransformer from '../transformers/lengthToEmsTransformer'
import { createBreakpointMapping, parseBreakpoint } from '../utils/breakpoints'
import { defaultToObj } from '../utils/functions'
import { numKeys } from '../utils/list'
import { reduceObjIndexed } from '../utils/objects'
import {
  isDefaultBreakpoint,
  isMediaQueryString,
  modifierIsAtModifier,
  modifierIsGtModifier,
  modifierIsLtModifier,
} from '../utils/predicate'
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

const findBreakpointByName = curry((breakpointMap, name) =>
  compose(
    when(isNotUndefined, last),
    find(lensSatisfies(equals(name), lensIndex(0)))
  )(breakpointMap)
)

const findBreakpointIndex = (breakpointMap, name) =>
  findIndex(lensSatisfies(equals(name), lensIndex(0)), breakpointMap)

const findBreakpointByIndex = nth

const templateForQuery = (idx, mappedValues) => name => {
  if (idx < mappedValues.length - 1) {
    return isDefaultBreakpoint(name)
      ? createQueryMaxHeaderFromTemplate(mappedValues[idx + 1][1])
      : createQueryMinMaxHeaderFromTemplate(mappedValues[idx + 1][1])
  }
  return isDefaultBreakpoint(name)
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

// const validateBreakpointNames = (value, breakpointMap) => map(v => {
//   const name = propName(v)
//   pipe(
//     findBreakpointByName(breakpointMap),
//     throwWhenUndefined(noBreakpointWithNameError(breakpoint[0].name))
//   )(name)
// }
//   ,
//   value
// )

// map through each value in 'range' and check name exists.
// NO not error.
// YES Add that breakpoint's value to the item's 'value' field.
// Use the range to create a template
// Return the template.

const createQueryHeaderFromRange = breakpointMap => range => {
  const firstRangeItem = head(range)
  // Handle a single range item
  if (lengthEq(1, range)) {
    if (modifierIsLtModifier(firstRangeItem)) {
      return createQueryMaxHeaderFromTemplate(firstRangeItem.value)
    } else if (
      modifierIsGtModifier(firstRangeItem) ||
      !firstRangeItem.modifier
    ) {
      return isDefaultBreakpoint(firstRangeItem.name)
        ? null
        : createQueryMinHeaderFromTemplate(firstRangeItem.value)
    } else if (modifierIsAtModifier(firstRangeItem)) {
      console.log(`AT MOD ++++++++`, firstRangeItem.name)
      // We need to limit ourselves using a max of the next query if it exists.
      // Use our own index to check if there is a breakpoint after us
      const rangeItemIdx = findBreakpointIndex(
        breakpointMap,
        firstRangeItem.name
      )
      if (breakpointMap.length - 1 > rangeItemIdx) {
        // It does exist so get ists value
        const nextItemValue = findBreakpointByIndex(
          rangeItemIdx + 1,
          breakpointMap
        )[1]
        console.log(`NEXT`, nextItemValue[1])
        return isDefaultBreakpoint(firstRangeItem.name)
          ? createQueryMaxHeaderFromTemplate(nextItemValue)
          : createQueryMinMaxHeaderFromTemplate(
              nextItemValue,
              firstRangeItem.value
            )
      }
      // Otherwise we are the last breakpoint so we don't need a max
      return createQueryMinHeaderFromTemplate(firstRangeItem.value)
    }
    // Need to create a range using the next breakpoint or default to min
    throw new Error(`A bucket of WTF?`)
  }
  const secondRangeItem = nth(1, range)
  return isDefaultBreakpoint(firstRangeItem.name)
    ? createQueryMaxHeaderFromTemplate(secondRangeItem.value)
    : createQueryMinMaxHeaderFromTemplate(
        secondRangeItem.value,
        firstRangeItem.value
      )
}

const attachBreakpointValues = (breakpointMap, name, range) =>
  map(rangeItem => {
    const value = pipe(
      findBreakpointByName(breakpointMap),
      throwWhenUndefined(noBreakpointWithNameError(name))
    )(rangeItem.name)
    return assoc(`value`, value, rangeItem)
  }, range)

const buildQueryForRange = (breakpointMap, name, range) =>
  pipe(attachBreakpointValues, createQueryHeaderFromRange(breakpointMap))(
    breakpointMap,
    name,
    range
  )

const createApi = breakpointMap => {
  // Resolve breakpoints for values declared using an object syntax
  const byName = values => {
    const parsedValues = reduceObjIndexed(
      (mappings, [name, value]) =>
        pipe(parseBreakpoint, assoc(`value`, value), appendFlipped(mappings))(
          name
        ),
      [],
      values
    )

    const mappedValues = reduce(
      (mappings, { name, range, value }) =>
        pipe(
          buildQueryForRange,
          createBreakpointMapping(name, __, value),
          appendFlipped(mappings)
        )(breakpointMap, name, range),
      [],
      parsedValues
    )
    return mappedValues
  }

  // Resolve breakpoints for values declared using an array syntax
  const byIndex = values => {
    // First check the validity of each breakpoint and store its value
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

    // Next render the template for each value
    return mapIndexed((value, idx) => {
      // decide on the correct template to use
      const templateFunction = pipe(head, templateForQuery(idx, mappedValues))(
        value
      )
      // render the template
      return pipe(adjust(templateFunction, 1), apply(createBreakpointMapping))(
        value
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
