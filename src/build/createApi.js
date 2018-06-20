import { curry, mergeDeepRight, pipe } from 'ramda'
import cssapi from '../index'
import {
  addBreakpointToDeclarations,
  batchDeclarations,
  optimiseDeclarations,
} from '../utils/declarations'
import processDeclarations from './declarations/processDeclarations'
import renderBatch from './declarations/renderers/renderBatch'

const buildApiFunc = processors =>
  pipe(
    processDeclarations(processors),
    optimiseDeclarations,
    batchDeclarations,
    renderBatch
  )

const buildMqFunc = api => {
  api.mq = curry((breakpoint, declarations) =>
    pipe(addBreakpointToDeclarations, api)(breakpoint, declarations)
  )
  return api
}

const buildExtendFunc = baseConfig => api => {
  api.extend = pipe(mergeDeepRight(baseConfig), cssapi)
  return api
}

const createApi = config =>
  pipe(buildApiFunc, buildMqFunc, buildExtendFunc(config))

export default createApi
