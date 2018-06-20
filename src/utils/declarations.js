import {
  always,
  append,
  assoc,
  assocPath,
  both,
  converge,
  curry,
  equals,
  findIndex,
  flip,
  gte,
  ifElse,
  init,
  last,
  lensIndex,
  objOf,
  omit,
  over,
  pipe,
  reduce,
  unless,
  __,
} from 'ramda'
import { concatRight, isNotNil, lensEq } from 'ramda-adjunct'
import BREAKPOINT_MAPPING_FIELDS from '../const/breakpointMapping'
import QUERY_DESCRIPTOR_FIELDS from '../const/queryDescriptor'
import { throwMQError, unsupportedBreakpointValuesError } from '../errors'
import {
  createBreakpointMapping,
  lName,
  lQuery,
  propValue,
} from '../objects/breakpointMapping'
import { reduceObjIndexed } from '../utils/objects'
import { isValidMqValue } from '../utils/predicate'

const { QUERY } = BREAKPOINT_MAPPING_FIELDS

const { TO } = QUERY_DESCRIPTOR_FIELDS

const foundMatch = flip(gte)(0)

const findBatchIndexForMapping = ({ name, query }, batches) =>
  findIndex(both(lensEq(lName, name), lensEq(lQuery, query)), batches)

const createNewBatch = (breakpointMapping, batches) =>
  append(breakpointMapping, batches)

const addToBatch = ({ name, query, value }) =>
  pipe(propValue, concatRight(value), createBreakpointMapping(name, __, query))

const addToBatchAtIndex = curry((breakpointMapping, batches, index) =>
  over(lensIndex(index), addToBatch(breakpointMapping), batches)
)

export const batchDeclarations = reduce(
  (batches, breakpointMapping) =>
    pipe(
      findBatchIndexForMapping,
      ifElse(foundMatch, addToBatchAtIndex(breakpointMapping, batches), () =>
        createNewBatch(breakpointMapping, batches)
      )
    )(breakpointMapping, batches),
  []
)

const addBreakpoingToDeclaration = breakpoint => (acc, [name, value]) =>
  pipe(
    unless(isValidMqValue, () =>
      throwMQError(unsupportedBreakpointValuesError(value))
    ),
    objOf(breakpoint),
    assoc(name, __, acc)
  )(value)

export const addBreakpointToDeclarations = (breakpoint, declarations) =>
  reduceObjIndexed(addBreakpoingToDeclaration(breakpoint), {}, declarations)

const assocPathQueryTo = assocPath([QUERY, TO])

const compareMappings = (previous, current) =>
  current.value !== `_` && (!previous || !equals(previous.value, current.value))

const replaceToValue = newToValue =>
  ifElse(
    always(isNotNil(newToValue)),
    assocPathQueryTo(newToValue),
    over(lQuery, omit([TO]))
  )

const updateQuery = newToValue => pipe(last, replaceToValue(newToValue))

const updateLastMapping = (acc, newToValue) =>
  converge(append, [updateQuery(newToValue), init])(acc)

// This is gross
export const optimiseDeclarations = mappings => {
  let lastMapping
  return reduce(
    (acc, mapping) => {
      let result
      const shouldAdd = compareMappings(lastMapping, mapping)
      if (shouldAdd) {
        lastMapping = mapping
        result = append(mapping, acc)
      } else {
        result = updateLastMapping(acc, mapping.query.to)
        lastMapping = last(result)
      }
      return result
    },
    [],
    mappings
  )
}
