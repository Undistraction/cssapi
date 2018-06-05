import {
  T,
  __,
  apply,
  both,
  cond,
  either,
  head,
  identity,
  isNil,
  map,
  nth,
  pipe,
  reduce,
  unless,
  useWith,
} from 'ramda'
import { appendFlipped, list, mapIndexed } from 'ramda-adjunct'
import { propValue } from '../../lib/utils/breakpointMapping'
import rootPxToEmTransformer from '../transformers/rootPxToEmTransformer'
import {
  buildMappingsByIndex,
  findBreakpointByName,
  findBreakpointIndex,
  findNextBreakpointByIndex,
  isNotLastBreakpoint,
} from '../utils/breakpointMap'
import {
  assocQuery,
  assocValue,
  createBreakpointMapping,
  propName,
  propQuery,
} from '../utils/breakpointMapping'
import { parseBreakpoint } from '../utils/breakpoints'
import { defaultToObj } from '../utils/functions'
import { lengthEq1, numKeys } from '../utils/list'
import { reduceObjIndexed } from '../utils/objects'
import { addEmValues } from '../utils/parse'
import {
  hasNegativeOffset,
  isDefaultBreakpoint,
  isEmString,
  modifierIsGtModifier,
  modifierIsLtModifier,
} from '../utils/predicate'
import { hasNoModifier, propOffset } from '../utils/range'
import {
  createQueryMaxHeaderFromTemplate,
  createQueryMinHeaderFromTemplate,
  createQueryMinMaxHeaderFromTemplate,
} from '../utils/templates'

const breakpointValuesToEms = map(
  apply(useWith(list, [identity, unless(isEmString, rootPxToEmTransformer)]))
)

const queryHeader = (idx, mappedValues) => name => {
  const queryValue = propQuery(mappedValues[idx])
  if (idx < mappedValues.length - 1) {
    const nextQueryValue = propQuery(mappedValues[idx + 1])
    return isDefaultBreakpoint(name)
      ? createQueryMaxHeaderFromTemplate(nextQueryValue)
      : createQueryMinMaxHeaderFromTemplate(nextQueryValue, queryValue)
  }
  return isDefaultBreakpoint(name)
    ? null
    : createQueryMinHeaderFromTemplate(queryValue)
}

const applyOffsetToBreakpointValue = rangeItem =>
  cond([
    [pipe(propOffset, isNil), propValue],
    [
      both(
        pipe(propName, isDefaultBreakpoint),
        pipe(propOffset, hasNegativeOffset)
      ),
      () => 0,
    ],
    [
      T,
      pipe(
        propOffset,
        unless(isEmString, rootPxToEmTransformer),
        addEmValues(rangeItem.value)
      ),
    ],
  ])(rangeItem)

const renderGtQuery = (breakpointMap, rangeItem, rangeItemValue) =>
  isDefaultBreakpoint(rangeItem.name)
    ? null
    : createQueryMinHeaderFromTemplate(rangeItemValue)

const renderLtQuery = (breakpointMap, rangeItem, rangeItemValue) =>
  createQueryMaxHeaderFromTemplate(rangeItemValue)

const renderAtQuery = (breakpointMap, rangeItem, rangeItemValue) => {
  // We need to limit ourselves using a max of the next query if it exists.
  // Use our own index to check if there is a breakpoint after us
  const idx = findBreakpointIndex(breakpointMap, rangeItem.name)

  if (isNotLastBreakpoint(breakpointMap, idx)) {
    // It does exist so get its value
    const nextBreakpointValue = pipe(
      findNextBreakpointByIndex(breakpointMap),
      nth(1)
    )(idx)
    return isDefaultBreakpoint(rangeItem.name)
      ? createQueryMaxHeaderFromTemplate(nextBreakpointValue)
      : createQueryMinMaxHeaderFromTemplate(nextBreakpointValue, rangeItemValue)
  }
  // Otherwise we are the last breakpoint so we don't need a max
  return createQueryMinHeaderFromTemplate(rangeItemValue)
}

const renderRangeQuery = (
  breakpointMap,
  firstRangeItem,
  firstItemValue,
  range
) => {
  const secondItemValue = pipe(nth(1), applyOffsetToBreakpointValue)(range)
  return isDefaultBreakpoint(firstRangeItem.name) && firstItemValue === 0
    ? createQueryMaxHeaderFromTemplate(secondItemValue)
    : createQueryMinMaxHeaderFromTemplate(secondItemValue, firstItemValue)
}

const renderSingleQuery = cond([
  [either(hasNoModifier, modifierIsGtModifier), () => renderGtQuery],
  [modifierIsLtModifier, () => renderLtQuery],
  [T, () => renderAtQuery],
])

const createQueryHeaderFromRange = breakpointMap => range => {
  const firstRangeItem = head(range)
  const firstItemValue = applyOffsetToBreakpointValue(firstRangeItem)
  const renderQuery = lengthEq1(range)
    ? renderSingleQuery(firstRangeItem)
    : renderRangeQuery
  return renderQuery(breakpointMap, firstRangeItem, firstItemValue, range)
}

const attachBreakpointValues = breakpointMap => (name, range) =>
  map(
    rangeItem =>
      pipe(
        propName,
        findBreakpointByName(breakpointMap),
        assocValue(__, rangeItem)
      )(rangeItem),
    range
  )

const queryHeaderForRange = breakpointMap =>
  pipe(
    attachBreakpointValues(breakpointMap),
    createQueryHeaderFromRange(breakpointMap)
  )

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

const createApi = breakpointMap => {
  // Resolve breakpoints for values declared using an object syntax
  const byName = values => {
    // Parse the breakpoint descriptors
    const parsedValues = reduceObjIndexed(
      (mappings, [name, value]) =>
        pipe(parseBreakpoint, assocValue(value), appendFlipped(mappings))(name),
      [],
      values
    )
    // Create query headers
    return reduce(
      (mappings, { name, range, value }) =>
        pipe(
          queryHeaderForRange(breakpointMap),
          createBreakpointMapping(name, value),
          appendFlipped(mappings)
        )(name, range),
      [],
      parsedValues
    )
  }

  // Resolve breakpoints for values declared using an array syntax
  const byIndex = values => {
    const mappedValues = buildMappingsByIndex(breakpointMap, values)

    // Render the appropriate template
    return mapIndexed(
      (value, idx) =>
        pipe(propName, queryHeader(idx, mappedValues), assocQuery(__, value))(
          value
        ),
      mappedValues
    )
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
  breakpointValuesToEms,
  createApi
)

export default defaultBreakpointMapProvider
