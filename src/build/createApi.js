import { assoc, curry, mergeDeepRight, objOf, pipe, unless, __ } from 'ramda'
import { throwMQError, unsupportedBreakpointValuesError } from '../errors'
import cssapi from '../index'
import { batchDeclarations } from '../utils/declarations'
import { reduceObjIndexed } from '../utils/objects'
import { isValidMqValue } from '../utils/predicate'
import processDeclarations from './declarations/processDeclarations'
import renderStyles from './declarations/renderers/renderStyles'

const buildApiFunc = processors =>
  pipe(processDeclarations(processors), batchDeclarations, renderStyles)

const attachBreakpointsToDeclarations = (breakpoint, declarations) =>
  reduceObjIndexed(
    (acc, [name, value]) =>
      pipe(
        unless(isValidMqValue, () =>
          throwMQError(unsupportedBreakpointValuesError(value))
        ),
        objOf(breakpoint),
        assoc(name, __, acc)
      )(value),
    {},
    declarations
  )

const buildMqFunc = apiFunc => {
  apiFunc.mq = curry((breakpoint, declarations) =>
    pipe(attachBreakpointsToDeclarations, apiFunc)(breakpoint, declarations)
  )
  return apiFunc
}

const buildExtendFunc = baseConfig => apiFunc => {
  apiFunc.extend = pipe(mergeDeepRight(baseConfig), cssapi)
  return apiFunc
}

const createApi = config =>
  pipe(buildApiFunc, buildMqFunc, buildExtendFunc(config))

export default createApi
