import {
  unless,
  always,
  compose,
  reduce,
  assoc,
  defaultTo,
  curry,
  __,
  partial,
  pipe,
  equals,
  when,
} from 'ramda'
import {
  isEmptyString,
  stubString,
  appendFlipped,
  ensureArray,
  stubObj,
  isObject,
} from 'ramda-adjunct'
import breakpointResolver from './breakpoints/breakpointResolver'
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
import { transform } from './utils/transformers'

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
    curry(transform(transformers))(__, data),
    render(renderer, name),
    wrapWithQuery(breakpointMap, breakpointName),
    appendToOutput(output)
  )(value)

const renderCSSForBreakpoints = (
  name,
  breakpointMap,
  data,
  { transformers, renderer }
) =>
  reduce(
    renderCSSForBreakpoint(name, transformers, renderer, breakpointMap, data),
    stubString()
  )

const buildFunction = (breakpointMap, data) => (acc, [name, style]) =>
  assoc(
    name,
    compose(
      renderCSSForBreakpoints(name, breakpointMap, data, style),
      breakpointResolver(breakpointMap)
    ),
    acc
  )

const buildFunctions = (breakpointMapOrProvider, data, config) => {
  const configuredBreakpointMapProvider = pipe(
    when(
      isObject,
      compose(defaultBreakpointMapProvider, ensureBreakpointMapHasDefault)
    )
  )(breakpointMapOrProvider)

  return reduceObjIndexed(
    buildFunction(configuredBreakpointMapProvider, data),
    stubObj(),
    config
  )
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const api = (breakpointMap, data = {}, config = defaultConfig) =>
  buildFunctions(breakpointMap, data, config)

export default api
