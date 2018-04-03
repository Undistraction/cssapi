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
} from 'ramda'
import {
  isEmptyString,
  stubString,
  appendFlipped,
  ensureArray,
} from 'ramda-adjunct'
import breakpointResolver from '../resolvers/breakpointResolver'
import renderQuery from '../renderers/renderQuery'
import renderProp from '../renderers/renderProp'
import { findBreakpointByName } from '../utils/breakpoints'
import { joinWithNewline } from '../utils/formatting'
import { DEFAULT_BREAKPOINT } from '../const'
import { reduceObjIndexed } from '../utils/objects'

const isDefaultValue = breakpointName =>
  always(breakpointName === DEFAULT_BREAKPOINT)

const appendCSS = css =>
  unless(
    always(isEmptyString(css)),
    compose(joinWithNewline, appendFlipped([css]))
  )

const wrapWithQueryIfNotDefault = (breakpointMap, breakpointName) =>
  unless(
    isDefaultValue(breakpointName),
    renderQuery(findBreakpointByName(breakpointMap, breakpointName))
  )

const transformValue = transformers =>
  compose(apply(compose), defaultTo([identity]))(transformers)

const render = (renderer, styleName) =>
  compose(partial(defaultTo(renderProp)(renderer), [styleName]), ensureArray)

const renderCSSForBreakpoint = (
  styleName,
  transformers,
  renderer,
  breakpointMap
) => (acc, [breakpointName, value]) =>
  compose(
    appendCSS(acc),
    wrapWithQueryIfNotDefault(breakpointMap, breakpointName),
    render(renderer, styleName),
    transformValue(transformers)
  )(value)

const renderCSSForBreakpoints = (
  transformers,
  renderer,
  styleName,
  breakpointMap
) =>
  reduce(
    renderCSSForBreakpoint(styleName, transformers, renderer, breakpointMap),
    stubString()
  )

const buildFunctionForStyle = breakpointMap => (acc, [styleName, style]) =>
  assoc(
    styleName,
    compose(
      renderCSSForBreakpoints(
        style.transformers,
        style.renderer,
        styleName,
        breakpointMap
      ),
      breakpointResolver(breakpointMap)
    ),
    acc
  )
const buildBasicStylesAPI = (breakpointMap, config) =>
  reduceObjIndexed(buildFunctionForStyle(breakpointMap), {}, config.styles)

export default buildBasicStylesAPI
