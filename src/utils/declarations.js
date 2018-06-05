import {
  __,
  append,
  both,
  findIndex,
  flip,
  gte,
  lensIndex,
  over,
  pipe,
  reduce,
} from 'ramda'
import { concatRight, lensEq } from 'ramda-adjunct'
import {
  createBreakpointMapping,
  lName,
  lQuery,
  propValue,
} from '../utils/breakpointMapping'

const foundMatch = flip(gte)(0)

const findBatchIndex = (batches, { name, query }) => {
  const result = findIndex(
    both(lensEq(lName, name), lensEq(lQuery, query)),
    batches
  )
  return result
}

const createNewBatch = (breakpointMapping, batches) =>
  append(breakpointMapping, batches)

const addToBatch = ({ name, query, value }) =>
  pipe(propValue, concatRight(value), createBreakpointMapping(name, __, query))

// eslint-disable-next-line import/prefer-default-export
export const batchDeclarations = reduce((batches, breakpointMapping) => {
  const matchedIndex = findBatchIndex(batches, breakpointMapping)
  return foundMatch(matchedIndex)
    ? over(lensIndex(matchedIndex), addToBatch(breakpointMapping), batches)
    : createNewBatch(breakpointMapping, batches)
}, [])
