import {
  apply,
  curry,
  compose,
  pipe,
  prop,
  unnest,
  identity,
  converge,
  assoc,
  objOf,
  unless,
  __,
} from 'ramda'
import { appendFlipped, ensureArray } from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import renderStyles from './renderStyles'
import { batchDeclarations } from '../utils/declarations'
import { isValidMqValue } from '../utils/predicate'
import { unsupportedBreakpointValues, throwMQError } from '../errors'

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

const attachBreakpointsToDeclarations = (breakpointName, batch) =>
  reduceObjIndexed(
    (acc, [name, value]) =>
      pipe(
        unless(isValidMqValue, () =>
          throwMQError(unsupportedBreakpointValues(value))
        ),
        objOf(breakpointName),
        assoc(name, __, acc)
      )(value),
    {},
    batch
  )

const buildMqFunc = apiFunc => {
  const mqFunc = curry((breakpointName, batch) => {
    const newMap = attachBreakpointsToDeclarations(breakpointName, batch)
    return apiFunc(newMap)
  })
  apiFunc.mq = mqFunc
  return apiFunc
}

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

const buildApi = pipe(
  converge(appendFunctionsToApiFunc, [identity, buildApiFunc]),
  buildMqFunc
)

export default buildApi
