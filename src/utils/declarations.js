import {
  append,
  both,
  curry,
  findIndex,
  flip,
  gte,
  ifElse,
  lensIndex,
  over,
  pipe,
  reduce,
  __,
} from 'ramda'
import { concatRight, lensEq } from 'ramda-adjunct'
import {
  createBreakpointMapping,
  lName,
  lQuery,
  propValue,
} from '../objects/breakpointMapping'

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

// eslint-disable-next-line import/prefer-default-export
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
