import {
  reduce,
  compose,
  append,
  pipe,
  prop,
  unnest,
  findIndex,
  identity,
  converge,
  gte,
  flip,
  lensIndex,
  over,
} from 'ramda'
import { concatRight, appendFlipped, lensEq } from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import renderStyles from './renderStyles'
import { createBreakpointMapping } from '../utils/breakpoints'
import { propValue, lName } from '../utils/breakpointMapping'

const foundMatch = flip(gte)(0)

const findBatchIndex = (batches, { name }) =>
  findIndex(lensEq(lName, name), batches)

const createNewBatch = (breakpointMapping, batches) =>
  append(breakpointMapping, batches)

const addToBatch = ({ name, query, value }) =>
  pipe(propValue, concatRight(value), createBreakpointMapping(name, query))

const batchDeclarations = reduce((batches, breakpointMapping) => {
  const matchedIndex = findBatchIndex(batches, breakpointMapping)
  return foundMatch(matchedIndex)
    ? over(lensIndex(matchedIndex), addToBatch(breakpointMapping), batches)
    : createNewBatch(breakpointMapping, batches)
}, [])

const processDeclaration = declarationProcessors => (
  acc,
  [processorName, args]
) => {
  const declarationProcessor = prop(processorName, declarationProcessors)
  return appendFlipped(acc, declarationProcessor(...args))
}

const processDeclarations = declarationProcessors =>
  pipe(reduceObjIndexed(processDeclaration(declarationProcessors), []), unnest)

const buildApiFunc = declarationProcessors =>
  pipe(
    processDeclarations(declarationProcessors),
    batchDeclarations,
    renderStyles
  )

// Note: We are adding props to a function object so we need to mutate it. If
// we use ramda's api we will get a new object back.
const appendFunctionsToApiFunc = (declarationProcessors, apiFunc) => {
  for (const [name, declarationProcessor] of Object.entries(
    declarationProcessors
  )) {
    apiFunc[name] = compose(renderStyles, declarationProcessor)
  }
  return apiFunc
}

const buildApi = converge(appendFunctionsToApiFunc, [identity, buildApiFunc])

export default buildApi
