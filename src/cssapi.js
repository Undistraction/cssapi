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
  equals,
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
import {
  findBreakpointByName,
  ensureBreakpointMapHasDefault,
} from './utils/breakpoints'
import { joinWithNewline } from './utils/formatting'
import { DEFAULT_BREAKPOINT } from './const'
import { reduceObjIndexed } from './utils/objects'
import defaultConfig from './config/defaultConfig'
import defaultBreakpointMapProvider from './breakpoints/defaultBreakpointProvider'

const isDefaultValue = equals(DEFAULT_BREAKPOINT)

const appendToOutput = css =>
  unless(
    always(isEmptyString(css)),
    compose(joinWithNewline, appendFlipped([css]))
  )

const wrapWithQuery = (breakpointMap, breakpointName) =>
  unless(
    always(isDefaultValue(breakpointName)),
    renderQuery(findBreakpointByName(breakpointMap, breakpointName))
  )

const transform = (transformers, data) => v =>
  compose(apply(compose), ensureArray, defaultTo([identity]))(transformers)(
    v,
    data
  )

const render = (renderer, name) =>
  compose(partial(defaultTo(renderProp)(renderer), [name]), ensureArray)

const renderCSSForBreakpoint = (
  name,
  transformers,
  renderer,
  breakpointMap,
  data
) => (output, [breakpointName, value]) =>
  pipe(
    transform(transformers, data),
    render(renderer, name),
    wrapWithQuery(breakpointMap, breakpointName),
    appendToOutput(output)
  )(value)

const renderCSSForBreakpoints = (
  transformers,
  renderer,
  name,
  breakpointMap,
  data
) =>
  reduce(
    renderCSSForBreakpoint(name, transformers, renderer, breakpointMap, data),
    stubString()
  )

const buildFunction = (breakpointMap, data) => (acc, [name, style]) =>
  assoc(
    name,
    compose(
      renderCSSForBreakpoints(
        style.transformers,
        style.renderer,
        name,
        breakpointMap,
        data
      ),
      breakpointResolver(breakpointMap)
    ),
    acc
  )

const buildFunctions = (breakpointMapOrProvider, data, api) => {
  breakpointMapOrProvider = ensureBreakpointMapHasDefault(
    breakpointMapOrProvider
  )

  if (isObject(breakpointMapOrProvider)) {
    breakpointMapOrProvider = defaultBreakpointMapProvider(
      breakpointMapOrProvider
    )
  }

  return reduceObjIndexed(
    buildFunction(breakpointMapOrProvider, data),
    stubObj(),
    api
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = (breakpointMap, data = {}, config = defaultConfig) =>
  buildFunctions(breakpointMap, data, config.api)

export default api
