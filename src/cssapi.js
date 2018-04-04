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
  has,
  map,
} from 'ramda'
import {
  isEmptyString,
  stubString,
  appendFlipped,
  ensureArray,
  stubObj,
  isObject,
  isUndefined,
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
import defaultBreakpointMapProvider from './providers/defaultBreakpointMapProvider'

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

const provide = provider => unless(always(isUndefined(provider)), provider)

const transform = transformers =>
  compose(apply(compose), defaultTo([identity]))(transformers)

const render = (renderer, name) =>
  compose(partial(defaultTo(renderProp)(renderer), [name]), ensureArray)

const renderCSSForBreakpoint = (
  name,
  provider,
  transformers,
  renderer,
  breakpointMap
) => (output, [breakpointName, value]) =>
  pipe(
    provide(provider),
    transform(transformers),
    render(renderer, name),
    wrapWithQuery(breakpointMap, breakpointName),
    appendToOutput(output)
  )(value)

const renderCSSForBreakpoints = (
  provider,
  transformers,
  renderer,
  name,
  breakpointMap
) =>
  reduce(
    renderCSSForBreakpoint(
      name,
      provider,
      transformers,
      renderer,
      breakpointMap
    ),
    stubString()
  )

const buildFunction = breakpointMap => (acc, [name, style]) =>
  assoc(
    name,
    compose(
      renderCSSForBreakpoints(
        style.provider,
        style.transformers,
        style.renderer,
        name,
        breakpointMap
      ),
      breakpointResolver(breakpointMap)
    ),
    acc
  )

const supplyProviders = (api, data) =>
  map(
    value =>
      has(`provider`, value)
        ? assoc(`provider`, value.provider(data), value)
        : value,
    api
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

  api = supplyProviders(api, data)

  return reduceObjIndexed(
    buildFunction(breakpointMapOrProvider),
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
