import {
  append,
  assoc,
  both,
  curry,
  findIndex,
  flip,
  gte,
  ifElse,
  lensIndex,
  objOf,
  over,
  pipe,
  reduce,
  unless,
  __,
} from 'ramda'
import { concatRight, lensEq } from 'ramda-adjunct'
import { throwMQError, unsupportedBreakpointValuesError } from '../errors'
import {
  createBreakpointMapping,
  lName,
  lQuery,
  propValue,
} from '../objects/breakpointMapping'
import { reduceObjIndexed } from '../utils/objects'
import { isValidMqValue } from '../utils/predicate'

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
