import {
  reduce,
  append,
  pipe,
  findIndex,
  flip,
  lensIndex,
  over,
  gte,
} from 'ramda'
import { concatRight, lensEq } from 'ramda-adjunct'
import { createBreakpointMapping } from '../utils/breakpoints'
import { propValue, lName } from '../utils/breakpointMapping'

const foundMatch = flip(gte)(0)

const findBatchIndex = (batches, { name }) =>
  findIndex(lensEq(lName, name), batches)

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
