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
import {
  stubArray,
  ensureArray,
  concatRight,
  appendFlipped,
} from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import renderStyles from './renderStyles'

const batchDeclarations = reduce((acc, [name, query, declarations]) => {
  const matchedIndex = findIndex(compose(equals(name), head), acc)
  return matchedIndex === -1
    ? append([name, query, declarations], acc)
    : pipe(
        nth(matchedIndex),
        nth(2),
        concatRight(declarations),
        appendFlipped([name, query]),
        update(matchedIndex, __, acc)
      )(acc)
}, stubArray())

const processDeclaration = declarationProcessors => (
  acc,
  [processorName, args]
) =>
  pipe(
    ensureArray,
    apply(prop(processorName, declarationProcessors)),
    append(__, acc)
  )(args)

const processObj = declarationProcessors =>
  reduceObjIndexed(processDeclaration(declarationProcessors), stubArray())

const buildApiFunc = declarationProcessors =>
  pipe(
    processObj(declarationProcessors),
    unnest,
    batchDeclarations,
    renderStyles
  )

const appendFunctionsToApiFunc = (declarationProcessors, apiFunc) => {
  // Note: We are adding props to a function object so we need to mutate it. If
  // we use ramda's api we will get a new object back.
  for (const [name, declarationProcessor] of Object.entries(
    declarationProcessors
  )) {
    apiFunc[name] = compose(renderStyles, declarationProcessor)
  }
  return apiFunc
}

const buildApi = converge(appendFunctionsToApiFunc, [identity, buildApiFunc])

export default buildApi
