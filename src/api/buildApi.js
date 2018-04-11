import {
  reduce,
  compose,
  append,
  apply,
  pipe,
  __,
  prop,
  unnest,
  head,
  equals,
  update,
  nth,
  findIndex,
  identity,
  converge,
} from 'ramda'
import { ensureArray, concatRight, appendFlipped } from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import renderStyles from './renderStyles'

const foundMatch = equals(-1)

const findBatchIndex = (batches, [name]) =>
  findIndex(compose(equals(name), head), batches)

const createNewBatch = (batches, breakpointMapping) =>
  append(breakpointMapping, batches)

const addToBatch = (batches, [name, query, declarations], matchedIndex) =>
  pipe(
    nth(matchedIndex),
    nth(2),
    concatRight(declarations),
    appendFlipped([name, query]),
    update(matchedIndex, __, batches)
  )(batches)

const batchDeclarations = reduce((batches, breakpointMapping) => {
  const matchedIndex = findBatchIndex(batches, breakpointMapping)
  return foundMatch(matchedIndex)
    ? createNewBatch(batches, breakpointMapping)
    : addToBatch(batches, breakpointMapping, matchedIndex)
}, [])

const processDeclaration = declarationProcessors => (
  acc,
  [processorName, args]
) =>
  pipe(
    ensureArray,
    apply(prop(processorName, declarationProcessors)),
    append(__, acc)
  )(args)

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
