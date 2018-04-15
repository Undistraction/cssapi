import {
  compose,
  assoc,
  defaultTo,
  pipe,
  mergeDeepRight,
  unless,
  lensProp,
  over,
  lensPath,
  __,
} from 'ramda'
import { lensSatisfies } from 'ramda-adjunct'
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
import { CONFIG_FIELD_NAMES } from './const'

const { BREAKPOINTS, DATA, SCOPES } = CONFIG_FIELD_NAMES

const lBreakpoints = lensProp(BREAKPOINTS)

const mergeWithDefaultConfig = pipe(
  defaultTo({}),
  mergeDeepRight(defaultConfig)
)

const ensureDataScopes = over(lensPath([DATA, SCOPES]), defaultTo([]))

const createProcessor = (name, data, style, breakpointProvider) =>
  pipe(
    resolveBreakpoints(breakpointProvider),
    buildDeclaration(name, data, style)
  )

const buildDeclarationProcessor = (breakpointProvider, data) => (
  acc,
  [name, style]
) =>
  pipe(createProcessor, assoc(name, __, acc))(
    name,
    data,
    style,
    breakpointProvider
  )

const createDefaultBreakpointProvider = compose(
  defaultBreakpointMapProvider,
  ensureBreakpointMapHasDefault
)

const ensureBreakpointProvider = pipe(
  unless(
    lensSatisfies(isBreakpointProvider, lBreakpoints),
    over(lBreakpoints, createDefaultBreakpointProvider)
  )
)

const createDeclarationProcessors = ({ breakpoints, data, api }) =>
  reduceObjIndexed(buildDeclarationProcessor(breakpoints, data), {}, api)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = pipe(
  mergeWithDefaultConfig,
  ensureDataScopes,
  expandData,
  expandStyles,
  ensureBreakpointProvider,
  createDeclarationProcessors,
  buildApi
)

export default api
