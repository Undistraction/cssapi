import { pipe } from 'ramda'
import createApi from './build/createApi'
import createDeclarationProcessors from './build/declarations/createDeclarationProcessors'
import ensureBreakpointProvider from './build/ensureBreakpointProvider'
import expandData from './build/expansion/expandData'
import expandProperties from './build/expansion/expandProperties'
import mergeWithDefaultConfig from './build/mergeWithDefaultConfig'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = config =>
  pipe(
    mergeWithDefaultConfig,
    expandData,
    expandProperties,
    ensureBreakpointProvider,
    createDeclarationProcessors,
    createApi(config)
  )(config)

export default api
