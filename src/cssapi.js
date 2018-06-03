import { __, assoc, compose, mergeDeepRight, over, pipe, unless } from 'ramda'
import defaultBreakpointMapProvider from './breakpoints/defaultBreakpointProvider'
import resolveBreakpoints from './breakpoints/resolveBreakpoints'
import buildApi from './build/buildApi'
import buildDeclaration from './build/buildDeclaration'
import expandData from './build/expandData'
import expandStyles from './build/expandStyles'
import defaultConfig from './config/defaultConfig'
import { addDefaultBreakpoint } from './utils/breakpoints'
import { lBreakpoints, lDataScopes } from './utils/config'
import { defaultToArray, defaultToObj } from './utils/functions'
import { reduceObjIndexed } from './utils/objects'
import { isBreakpointProvider } from './utils/predicate'

const mergeWithDefaultConfig = mergeDeepRight(defaultConfig)

const ensureDataScopes = over(lDataScopes, defaultToArray)

const createDefaultBreakpointProvider = compose(
  defaultBreakpointMapProvider,
  addDefaultBreakpoint
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
