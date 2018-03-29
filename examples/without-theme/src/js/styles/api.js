import { apply, join, map, flatten, compose } from 'ramda'
import { mapIndexed, list, ensureArray } from 'ramda-adjunct'
import { logToConsole } from 'ramda-log'
import configureMQ from 'cssapi-mq'
import configureRhythm from 'cssapi-rhythm'
import configureBaseline from 'cssapi-baseline'
import configureFonts from 'cssapi-fonts'
import BP from './const/breakpoints'
import FONT from './const/fonts'
import FS from './const/fontStyle'
import FW from './const/fontWeight'
import FW_NAME from './const/fontWeightName'
import { css } from 'styled-components'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const joinWithNoSpace = join(``)

// -----------------------------------------------------------------------------
// Shared Configuration
// -----------------------------------------------------------------------------

const VERTICAL_RHYTHM_DEFAULT = 20
const VERTICAL_RHYTHM_SMALL_UP = 24
const ROOT_FONT_SIZE = 16
const RENDER_UNIT = `rem`

// -----------------------------------------------------------------------------
// Configure Media Queries
// -----------------------------------------------------------------------------

const mq = configureMQ({
  width: {
    [BP.SMALL]: 400,
    [BP.MEDIUM]: 1000,
    [BP.LARGE]: 1400,
    [BP.X_LARGE]: 1600,
  },
})

// -----------------------------------------------------------------------------
// Configure Rhythm
// -----------------------------------------------------------------------------

const rhythmDefault = configureRhythm({
  rootFontSize: ROOT_FONT_SIZE,
  rhythm: VERTICAL_RHYTHM_DEFAULT,
  renderUnit: RENDER_UNIT,
})

const rhythmSmallUp = configureRhythm({
  rootFontSize: ROOT_FONT_SIZE,
  rhythm: VERTICAL_RHYTHM_SMALL_UP,
  renderUnit: RENDER_UNIT,
})

// -----------------------------------------------------------------------------
// Configure Baseline
// -----------------------------------------------------------------------------

const baselineDefault = configureBaseline({
  rootFontSize: ROOT_FONT_SIZE,
  baselineHeight: VERTICAL_RHYTHM_DEFAULT,
  renderUnit: RENDER_UNIT,
})

const baselineSmallUp = configureBaseline({
  rootFontSize: ROOT_FONT_SIZE,
  baselineHeight: VERTICAL_RHYTHM_SMALL_UP,
  renderUnit: RENDER_UNIT,
})

// -----------------------------------------------------------------------------
// Configure Fonts
// -----------------------------------------------------------------------------
const fonts = configureFonts({
  fonts: [
    {
      family: FONT.RALEWAY,
      fallbacks: [FONT.HELVETICA, FONT.SANS_SERIF],
      weights: [
        {
          name: FW_NAME.EXTRA_LIGHT,
          weight: FW.EXTRA_LIGHT,
          styles: [
            {
              style: FS.NORMAL,
            },
          ],
        },
      ],
    },
    {
      family: FONT.MONTSERRAT,
      fallbacks: [FONT.HELVETICA, FONT.SANS_SERIF],
      weights: [
        {
          weight: FW.NORMAL,
          styles: [
            {
              style: FS.NORMAL,
            },
            {
              style: FS.ITALIC,
            },
          ],
        },
        {
          weight: FW.BOLD,
          styles: [
            {
              style: FS.NORMAL,
            },
            {
              style: FS.ITALIC,
            },
          ],
        },
      ],
    },
  ],
})

// -----------------------------------------------------------------------------
// Define Maps
// -----------------------------------------------------------------------------

const breakpointMapX = [
  mq.queryAboveWidth(BP.SMALL),
  mq.queryAboveWidth(BP.LARGE),
]

const baselineMapX = [baselineDefault, baselineSmallUp]
const rhythmMapX = [rhythmDefault, rhythmSmallUp]

// -----------------------------------------------------------------------------
// Define Resolvers
// -----------------------------------------------------------------------------

const boxResolver = m => idx => m[idx].rhythm
const configuredBoxResolver = boxResolver(rhythmMapX)

const baselineResolver = m => idx => m[idx].text
const configuredBaselineResolver = baselineResolver(baselineMapX)

// -----------------------------------------------------------------------------
// Render CSS
// -----------------------------------------------------------------------------

const toProp = (name, value) => `${name}: ${value};`
const toQuery = (breakpoint, prop) => breakpoint`${prop}`

// -----------------------------------------------------------------------------
// Build Props
// -----------------------------------------------------------------------------

const build = render =>
  compose(joinWithNoSpace, flatten, render, map(ensureArray), list)

// This is a factory function - it needs a prop name as well a resolver
const resolveBoxProp = (breakpointMap, resolver, name) =>
  build(
    mapIndexed((args, idx) => {
      const props = toProp(name, apply(resolver(idx), args))
      const propsCSS = joinWithNoSpace(css`
        ${props};
      `)
      return !idx ? propsCSS : toQuery(breakpointMap[idx - 1], propsCSS)
    })
  )

// This is a variation
const resolveBaseline = (breakpointMap, resolver) =>
  build(
    mapIndexed((args, idx) => {
      const props = apply(resolver(idx), args)
      const propsCSS = joinWithNoSpace(css`
        ${props};
      `)
      return !idx ? propsCSS : toQuery(breakpointMap[idx - 1], propsCSS)
    })
  )

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default {
  mq,
  rMargin: resolveBoxProp(breakpointMapX, configuredBoxResolver, `margin`),
  rPadding: resolveBoxProp(breakpointMapX, configuredBoxResolver, `padding`),
  rBorder: resolveBoxProp(breakpointMapX, configuredBoxResolver, `border`),
  rBaseline: resolveBaseline(breakpointMapX, configuredBaselineResolver),
  fonts,
}
