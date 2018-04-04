import {
  unless,
  always,
  compose,
  reduce,
  assoc,
  identity,
  defaultTo,
  apply,
  partial,
  pipe,
} from 'ramda'
import {
  isEmptyString,
  stubString,
  appendFlipped,
  ensureArray,
  stubObj,
  isObject,
} from 'ramda-adjunct'
import breakpointResolver from './resolvers/breakpointResolver'
import renderQuery from './renderers/renderQuery'
import renderProp from './renderers/renderProp'
import { findBreakpointByName } from './utils/breakpoints'
import { joinWithNewline } from './utils/formatting'
import { DEFAULT_BREAKPOINT } from './const'
import { reduceObjIndexed } from './utils/objects'
import defaultConfig from './config/defaultConfig'
import defaultBreakpointMapProvider from './providers/defaultBreakpointProvider'

const isDefaultValue = breakpointName =>
  always(breakpointName === DEFAULT_BREAKPOINT)

const appendToOutput = css =>
  unless(
    always(isEmptyString(css)),
    compose(joinWithNewline, appendFlipped([css]))
  )

const wrapWithQuery = (breakpointMap, breakpointName) =>
  unless(
    isDefaultValue(breakpointName),
    renderQuery(findBreakpointByName(breakpointMap, breakpointName))
  )

const transform = transformers =>
  compose(apply(compose), defaultTo([identity]))(transformers)

const render = (renderer, name) =>
  compose(partial(defaultTo(renderProp)(renderer), [name]), ensureArray)

const renderCSSForBreakpoint = (
  name,
  transformers,
  renderer,
  breakpointMap
) => (output, [breakpointName, value]) =>
  pipe(
    transform(transformers),
    render(renderer, name),
    wrapWithQuery(breakpointMap, breakpointName),
    appendToOutput(output)
  )(value)

const renderCSSForBreakpoints = (transformers, renderer, name, breakpointMap) =>
  reduce(
    renderCSSForBreakpoint(name, transformers, renderer, breakpointMap),
    stubString()
  )

const buildFunction = breakpointMap => (acc, [name, style]) =>
  assoc(
    name,
    compose(
      renderCSSForBreakpoints(
        style.transformers,
        style.renderer,
        name,
        breakpointMap
      ),
      breakpointResolver(breakpointMap)
    ),
    acc
  )

const buildFunctions = (breakpointMapOrProvider, api) => {
  if (isObject(breakpointMapOrProvider)) {
    breakpointMapOrProvider = defaultBreakpointMapProvider(
      breakpointMapOrProvider
    )
  }

  return reduceObjIndexed(
    buildFunction(breakpointMapOrProvider),
    stubObj(),
    api
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = (breakpointMap, config = defaultConfig) =>
  buildFunctions(breakpointMap, config.api)

export default api
