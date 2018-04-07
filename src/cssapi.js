import {
  compose,
  assoc,
  defaultTo,
  pipe,
  when,
  mergeDeepRight,
  props,
  apply,
} from 'ramda'
import { stubObj, isObject } from 'ramda-adjunct'
import breakpointResolver from './breakpoints/breakpointResolver'
import { ensureBreakpointMapHasDefault } from './utils/breakpoints'
import { reduceObjIndexed } from './utils/objects'
import defaultConfig from './config/defaultConfig'
import defaultBreakpointMapProvider from './breakpoints/defaultBreakpointProvider'
import declarationBuilder from './api/declarationBuilder'
import expandStyles from './api/expandStyles'

const buildFunction = (breakpointProvider, data) => (acc, [name, style]) =>
  assoc(
    name,
    pipe(
      breakpointResolver(breakpointProvider),
      declarationBuilder(name, data, style)
    ),
    acc
  )

const buildFunctions = (breakpointMapOrProvider, data, api) => {
  const configuredBreakpointMapProvider = pipe(
    when(
      isObject,
      compose(defaultBreakpointMapProvider, ensureBreakpointMapHasDefault)
    )
  )(breakpointMapOrProvider)

  return reduceObjIndexed(
    buildFunction(configuredBreakpointMapProvider, data),
    stubObj(),
    api
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = pipe(
  defaultTo(stubObj()),
  mergeDeepRight(defaultConfig),
  expandStyles,
  props([`breakpoints`, `data`, `api`]),
  apply(buildFunctions)
)

export default api
