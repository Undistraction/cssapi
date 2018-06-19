import {
  apply,
  converge,
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
} from '../objects/breakpointMapping'
import {
  findBreakpointByIndex,
  findBreakpointByName,
} from '../utils/breakpointMap'
import { breakpointValuesToEms, parseBreakpoint } from '../utils/breakpoints'
import { defaultToObj } from '../utils/functions'
import { numKeys } from '../utils/list'
import { reduceObjIndexed } from '../utils/objects'
import {
  calculateQueryDescriptor,
  calculateQueryDescriptorForRange,
} from '../utils/queryDescriptor'

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
    calculateQueryDescriptorForRange(breakpointMap)
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
        pipe(calculateQueryDescriptor, assocQuery(__, value))(
          idx,
          mappedValues
        ),
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
