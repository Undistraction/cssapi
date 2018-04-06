import { values } from 'ramda'

export const DEFAULT_BREAKPOINT = `default`

export const LENGTH_UNITS = Object.freeze({
  REM: `rem`,
  PX: `px`,
  EM: `em`,
})

export const PERCENT_UNIT = `%`

export const DIRECTIONS = {
  TOP: `top`,
  RIGHT: `right`,
  BOTTOM: `bottom`,
  LEFT: `left`,
}

export const DIRECTIONS_LIST = values(DIRECTIONS)
export const DIRECTIONS_LIST_HORIZONTAL = [DIRECTIONS.RIGHT, DIRECTIONS.LEFT]
export const DIRECTIONS_LIST_VERTICAL = [DIRECTIONS.TOP, DIRECTIONS.BOTTOM]

export const MIN_MAX = {
  MIN: `min`,
  MAX: `max`,
}
export const MIN_MAX_LIST = values(MIN_MAX)

export const AXES = {
  X: `x`,
  Y: `y`,
}
export const AXES_LIST = values(AXES)

export const ERROR_PREFIX = `[cssapi]`
export const CONFIGURE_PREFIX = `configuration()`

// eslint-disable-next-line no-useless-escape
export const REGEXP_COLOR = /^(#?([0-9a-f]{3}|[0-9a-f]{6})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i
export const REGEXP_RHYTHM_UNITS = /^^\d*\.?\d*ru$/
export const REGEXP_START_OF_LINE = /^/gm
export const REGEXP_NOTHING = /$^/
export const REGEXP_WHITESPACE = /\s+/
export const REGEXP_PERCENT_NUMBER = /^\d+%$/
export const REGEXP_TOKEN = /#{[a-z,A-Z,/n]+}/g
export const REGEXP_CAPITAL_LETTERS = /([A-Z])/g

export const BORDER_OUTLINE_STYLES = [
  `none`,
  `dotted`,
  `dashed`,
  `solid`,
  `double`,
  `groove`,
  `ridge`,
  `inset`,
  `outset`,
  `hidden`,
  `inherit`,
  `initial`,
  `unset`,
]

export const BORDER_WIDTHS = [
  `medium`,
  `thin`,
  `thick`,
  `length`,
  `initial`,
  `inherit`,
]

export const QUERY_TEMPLATE = `@media (min-width: #{minWidth})`
