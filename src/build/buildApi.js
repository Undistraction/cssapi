import {
  __,
  apply,
  assoc,
  curry,
  isNil,
  objOf,
  pipe,
  prop,
  tap,
  unless,
  unnest,
  when,
} from 'ramda'
import { appendFlipped, ensureArray, isNotUndefined } from 'ramda-adjunct'
import {
  invalidPropertyError,
  throwAPIError,
  throwMQError,
  unsupportedBreakpointValuesError,
} from '../errors'
import { batchDeclarations } from '../utils/declarations'
import { reduceObjIndexed } from '../utils/objects'
import { isValidMqValue } from '../utils/predicate'
import renderStyles from './renderStyles'

const logDeclarations = debugTag =>
  tap(v => {
    if (isNotUndefined(debugTag)) {
      // eslint-disable-next-line no-console
      console.log(debugTag, v)
    }
    return v
  })

const processDeclaration = declarationProcessors => (
  acc,
  [processorName, args]
) => {
  const property = prop(processorName, declarationProcessors)
  when(isNil, () => throwAPIError(invalidPropertyError(processorName)))(
    property
  )
  return pipe(ensureArray, apply(property), appendFlipped(acc))(args)
}

const processDeclarations = declarationProcessors =>
  pipe(reduceObjIndexed(processDeclaration(declarationProcessors), []), unnest)

const buildApiFunc = declarationProcessors => (value, debugTag) =>
  pipe(
    processDeclarations(declarationProcessors),
    batchDeclarations,
    logDeclarations(debugTag),
    renderStyles
  )(value)

const attachBreakpointsToDeclarations = (breakpointName, batch) =>
  reduceObjIndexed(
    (acc, [name, value]) =>
      pipe(
        unless(isValidMqValue, () =>
          throwMQError(unsupportedBreakpointValuesError(value))
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

const buildApi = pipe(buildApiFunc, buildMqFunc)

export default buildApi
