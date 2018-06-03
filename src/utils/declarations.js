import {
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
import { lName, lQuery, propValue } from '../utils/breakpointMapping'
import { createBreakpointMapping } from '../utils/breakpoints'

const foundMatch = flip(gte)(0)

const findBatchIndex = (batches, { name, query }) =>
  findIndex(both(lensEq(lName, name), lensEq(lQuery, query)), batches)

const createNewBatch = (breakpointMapping, batches) =>
  append(breakpointMapping, batches)

const addToBatch = ({ name, query, value }) =>
  pipe(propValue, concatRight(value), createBreakpointMapping(name, query))

// eslint-disable-next-line import/prefer-default-export
export const batchDeclarations = reduce((batches, breakpointMapping) => {
  const matchedIndex = findBatchIndex(batches, breakpointMapping)
  return foundMatch(matchedIndex)
    ? over(lensIndex(matchedIndex), addToBatch(breakpointMapping), batches)
    : createNewBatch(breakpointMapping, batches)
}, [])
