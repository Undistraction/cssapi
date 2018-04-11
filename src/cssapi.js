import { compose, assoc, defaultTo, pipe, mergeDeepRight, unless } from 'ramda'
import { stubObj } from 'ramda-adjunct'
import breakpointResolver from './breakpoints/breakpointResolver'
import { ensureBreakpointMapHasDefault } from './utils/breakpoints'
import { reduceObjIndexed } from './utils/objects'
import defaultConfig from './config/defaultConfig'
import defaultBreakpointMapProvider from './breakpoints/defaultBreakpointProvider'
import declarationBuilder from './api/declarationBuilder'
import expandStyles from './api/expandStyles'
import buildApi from './api/buildApi'
import expandData from './api/expandData'
import { isBreakpointProvider } from './utils/predicate'

const mergeDefaultConfig = pipe(
  defaultTo(stubObj()),
  mergeDeepRight(defaultConfig)
)

const buildDeclarationProcessor = (breakpointProvider, data) => (
  acc,
  [name, style]
) =>
  assoc(
    name,
    pipe(
      breakpointResolver(breakpointProvider),
      declarationBuilder(name, data, style)
    ),
    acc
  )

const buildDeclarationProcessors = ({ breakpoints, data, api }) => {
  const configuredBreakpointMapProvider = pipe(
    unless(
      isBreakpointProvider,
      compose(defaultBreakpointMapProvider, ensureBreakpointMapHasDefault)
    )
  )(breakpoints)

  return reduceObjIndexed(
    buildDeclarationProcessor(configuredBreakpointMapProvider, data),
    stubObj(),
    api
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = pipe(
  mergeDefaultConfig,
  expandData,
  expandStyles,
  buildDeclarationProcessors,
  buildApi
)

export default api
