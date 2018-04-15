import { compose, assoc, pipe, mergeDeepRight, unless, over, __ } from 'ramda'
import resolveBreakpoints from './breakpoints/resolveBreakpoints'
import { ensureBreakpointMapHasDefault } from './utils/breakpoints'
import { reduceObjIndexed } from './utils/objects'
import defaultConfig from './config/defaultConfig'
import defaultBreakpointMapProvider from './breakpoints/defaultBreakpointProvider'
import buildDeclaration from './api/buildDeclaration'
import expandStyles from './api/expandStyles'
import buildApi from './api/buildApi'
import expandData from './api/expandData'
import { isBreakpointProvider } from './utils/predicate'
import { lBreakpoints, lDataScopes } from './utils/config'
import { defaultToObj, defaultToArray } from './utils/functions'

const mergeWithDefaultConfig = mergeDeepRight(defaultConfig)

const ensureDataScopes = over(lDataScopes, defaultToArray)

const createDefaultBreakpointProvider = compose(
  defaultBreakpointMapProvider,
  ensureBreakpointMapHasDefault
)

const ensureBreakpointProvider = over(
  lBreakpoints,
  unless(isBreakpointProvider, createDefaultBreakpointProvider)
)

const createDeclarationProcessor = (breakpointProvider, name, data, style) =>
  pipe(
    resolveBreakpoints(breakpointProvider),
    buildDeclaration(name, data, style)
  )

const createDeclarationProcessorReducer = (breakpointProvider, data) => (
  acc,
  [name, style]
) =>
  pipe(createDeclarationProcessor, assoc(name, __, acc))(
    breakpointProvider,
    name,
    data,
    style
  )

const createDeclarationProcessors = ({ breakpoints, data, api }) =>
  reduceObjIndexed(
    createDeclarationProcessorReducer(breakpoints, data),
    {},
    api
  )

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = pipe(
  defaultToObj,
  mergeWithDefaultConfig,
  ensureDataScopes,
  expandData,
  expandStyles,
  ensureBreakpointProvider,
  createDeclarationProcessors,
  buildApi
)

export default api
