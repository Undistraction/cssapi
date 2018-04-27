import { compose, pipe, prop, unnest, identity, converge, apply } from 'ramda'
import { appendFlipped, ensureArray } from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import renderStyles from './renderStyles'
import { batchDeclarations } from '../utils/declarations'

const processDeclaration = declarationProcessors => (
  acc,
  [processorName, args]
) =>
  pipe(
    ensureArray,
    apply(prop(processorName, declarationProcessors)),
    appendFlipped(acc)
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
