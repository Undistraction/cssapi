export const DEFAULT_BREAKPOINT = `default`

export const LENGTH_UNITS = Object.freeze({
  REM: `rem`,
  PX: `px`,
  EM: `em`,
})

export const DIRECTIONS = {
  TOP: `top`,
  RIGHT: `right`,
  BOTTOM: `bottom`,
  LEFT: `left`,
}

export const DIRECTIONS_LIST = [
  DIRECTIONS.TOP,
  DIRECTIONS.RIGHT,
  DIRECTIONS.BOTTOM,
  DIRECTIONS.LEFT,
]

export const PERCENT_UNIT = `%`

export const ERROR_PREFIX = `[cssapi]`
export const CONFIGURE_PREFIX = `configuration()`

// eslint-disable-next-line no-useless-escape
export const REGEXP_COLOR = /^(#?([0-9a-f]{3}|[0-9a-f]{6})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i

export const REGEXP_RHYTHM_UNITS = /^\d+ru$/

export const REGEXP_NOTHING = /$^/

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
