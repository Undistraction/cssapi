import { compose, reduce, assoc, identity } from 'ramda'
import { isEmptyString, stubString } from 'ramda-adjunct'
import breakpointResolver from '../resolvers/breakpointResolver'
import defaultQueryRenderer from '../renderers/defaultQueryRenderer'
import defaultPropRenderer from '../renderers/defaultPropRenderer'
import { findBreakpointByName } from '../utils/breakpoints'
import { joinWithNewline } from '../utils/formatting'
import { DEFAULT_BREAKPOINT } from '../const'
import { reduceObjIndexed } from '../utils/objects'

const renderCSSForBreakpoint = (
  styleName,
  transformer = identity,
  breakpointMap
) => (acc2, [breakpointName, value]) => {
  const css =
    breakpointName === DEFAULT_BREAKPOINT
      ? defaultPropRenderer(styleName, transformer(value))
      : defaultQueryRenderer(
          findBreakpointByName(breakpointMap)(breakpointName),
          defaultPropRenderer(styleName, transformer(value))
        )
  return isEmptyString(acc2) ? css : joinWithNewline([acc2, css])
}

const renderCSSForBreakpoints = (style, styleName, breakpointMap) =>
  reduce(
    compose(
      renderCSSForBreakpoint(styleName, style.transformer, breakpointMap)
    ),
    stubString()
  )

const buildFunctionForStyle = breakpointMap => (acc, [styleName, style]) =>
  assoc(
    styleName,
    compose(
      renderCSSForBreakpoints(style, styleName, breakpointMap),
      breakpointResolver(breakpointMap)
      // ,
    ),
    acc
  )
const buildBasicStylesAPI = (breakpointMap, config) =>
  reduceObjIndexed(buildFunctionForStyle(breakpointMap), {}, config.styles)

export default buildBasicStylesAPI
