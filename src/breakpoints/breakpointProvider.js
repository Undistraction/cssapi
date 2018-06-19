import {
  apply,
  converge,
  head,
  identity,
  insert,
  map,
  once,
  pipe,
  reduce,
  __,
} from 'ramda'
import { appendFlipped, mapIndexed, reduceIndexed } from 'ramda-adjunct'
import {
  assocQuery,
  assocValue,
  createBreakpointMapping,
  propName,
  propQuery,
} from '../objects/breakpointMapping'
import createQueryDescriptor from '../objects/queryDescriptor'
import {
  findBreakpointByIndex,
  findBreakpointByName,
} from '../utils/breakpointMap'
import { breakpointValuesToEms, parseBreakpoint } from '../utils/breakpoints'
import { defaultToObj } from '../utils/functions'
import { lengthEq1, numKeys } from '../utils/list'
import { reduceObjIndexed } from '../utils/objects'
import { applyOffsetToBreakpointValue } from '../utils/range'
import renderRangeQuery from './renderers/renderRangeQuery'
import renderSingleQuery from './renderers/renderSingleQuery'

// -----------------------------------------------------------------------------
// Query Header
// -----------------------------------------------------------------------------

// Use an array of mappings to decide which header to render
const createQueryHeader = (idx, mappedValues) => {
  const queryValue = propQuery(mappedValues[idx])
  let nextQueryValue
  if (idx < mappedValues.length - 1) {
    nextQueryValue = propQuery(mappedValues[idx + 1])
  }
  return createQueryDescriptor({ from: queryValue, to: nextQueryValue })
}

const createQueryHeaderFromRange = breakpointMap => range => {
  const firstRangeItem = head(range)
  const firstItemValue = applyOffsetToBreakpointValue(firstRangeItem)
  const renderQuery = lengthEq1(range)
    ? renderSingleQuery(firstRangeItem)
    : renderRangeQuery
  return renderQuery(breakpointMap, firstRangeItem, firstItemValue, range)
}

// -----------------------------------------------------------------------------
// Process Range
// -----------------------------------------------------------------------------

const addBreakpointValueToRange = breakpointMap =>
  converge(assocValue, [
    pipe(propName, findBreakpointByName(breakpointMap)),
    identity,
  ])

const addBreakpointsToRange = breakpointMap =>
  map(addBreakpointValueToRange(breakpointMap))

const processRange = breakpointMap =>
  pipe(
    addBreakpointsToRange(breakpointMap),
    createQueryHeaderFromRange(breakpointMap)
  )

const parseBreakpointToMap = (breakpoints, [name, value]) =>
  pipe(parseBreakpoint, assocValue(value), appendFlipped(breakpoints))(name)

const parseBreakpointsToMap = reduceObjIndexed(parseBreakpointToMap, [])

const createMappingByName = breakpointMap => (
  mappings,
  { name, range, value }
) =>
  pipe(
    processRange(breakpointMap),
    createBreakpointMapping(name, value),
    appendFlipped(mappings)
  )(range)

const createMappingsByName = breakpointMap =>
  reduce(createMappingByName(breakpointMap), [])

const createMappingByIndex = breakpointMap => (mappings, value, idx) =>
  pipe(
    findBreakpointByIndex(breakpointMap),
    insert(1, value),
    apply(createBreakpointMapping),
    appendFlipped(mappings)
  )(idx)

const createMappingsByIndex = (breakpointMap, values) =>
  reduceIndexed(createMappingByIndex(breakpointMap), [], values)

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

const createApi = breakpointMap => {
  // Resolve breakpoints for values declared using an object syntax
  const byName = pipe(
    parseBreakpointsToMap,
    createMappingsByName(breakpointMap)
  )

  // Resolve breakpoints for values declared using an array syntax
  const byIndex = values => {
    const mappedValues = createMappingsByIndex(breakpointMap, values)
    // Render the appropriate template
    return mapIndexed(
      (value, idx) =>
        pipe(createQueryHeader, assocQuery(__, value))(idx, mappedValues),
      mappedValues
    )
  }

  const count = once(() => numKeys(breakpointMap))

  return {
    byIndex,
    byName,
    count,
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const breakpointProvider = pipe(defaultToObj, breakpointValuesToEms, createApi)

export default breakpointProvider
