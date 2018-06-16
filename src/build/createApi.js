import { assoc, curry, objOf, pipe, unless, __ } from 'ramda'
import { throwMQError, unsupportedBreakpointValuesError } from '../errors'
import { batchDeclarations } from '../utils/declarations'
import { reduceObjIndexed } from '../utils/objects'
import { isValidMqValue } from '../utils/predicate'
import processDeclarations from './declarations/processDeclarations'
import renderStyles from './declarations/renderStyles'

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

const createApi = pipe(buildApiFunc, buildMqFunc)

export default createApi
