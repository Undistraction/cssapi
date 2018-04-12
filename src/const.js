import { values } from 'ramda'

export const DEFAULT_BREAKPOINT = `default`

export const LENGTH_UNITS = Object.freeze({
  REM: `rem`,
  PX: `px`,
  EM: `em`,
})

export const ANGLE_UNITS = {
  DEG: `deg`,
  RAD: `rad`,
  GRAD: `grad`,
  TURN: `turn`,
}

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
export const DATA_PREFIX = `(config.data)`
export const BREAKPOINTS_PREFIX = `(config.breakpoints)`

// eslint-disable-next-line no-useless-escape
export const REGEXP_COLOR = /^(#?([0-9a-f]{3}|[0-9a-f]{6})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i
export const REGEXP_RHYTHM_UNITS = /^^\d*\.?\d*ru$/
export const REGEXP_START_OF_LINE = /^/gm
export const REGEXP_NOTHING = /$^/
export const REGEXP_WHITESPACE = /\s+/
export const REGEXP_PERCENT_NUMBER = /^\d+%$/
export const REGEXP_TOKEN = /#{[a-z,A-Z,/n]+}/g
export const REGEXP_CAPITAL_LETTERS = /([A-Z])/g
export const REGEXP_MEDIA_QUERY_STRING = /^@media /
export const REGEXP_RADIAL_GRADIENT = /^radial-gradient\(.+\)$/
export const REGEXP_LINEAR_GRADIENT = /^linear-gradient\(.+\)$/
export const REGEXP_URL = /^url\(.+\)$/
export const REGEXP_UNNESTED_COMMA = /,(?![^()]*(?:\([^()]*\))?\))/g
export const REGEXP_ARGUMENTS_OF_GRADIENT = /^(?:linear|radial)-gradient\((.*)\)$/g
export const REGEXP_GRADIENT_TYPE = /^(.*)-gradient/

export const GLOBAL_VALUES = [`inherit`, `initial`, `unset`]

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
  ...GLOBAL_VALUES,
]

export const BORDER_WIDTHS = [
  `medium`,
  `thin`,
  `thick`,
  `length`,
  ...GLOBAL_VALUES,
]

export const FONT_GENERIC_NAMES = [
  `serif`,
  `sans-serif`,
  `monospace`,
  `cursive`,
  `fantasy`,
  `system-ui`,
  ...GLOBAL_VALUES,
]

export const FONT_STYLES = [`normal`, `italic`, `oblique`]

export const FONT_WEIGHTS = [
  `normal`,
  `bold`,
  `lighter`,
  `bolder`,
  ...GLOBAL_VALUES,
]

export const FONT_STRETCHS = [
  `ultra-condensed`,
  `extra-condensed`,
  `condensed`,
  `semi-condensed`,
  `normal`,
  `semi-expanded`,
  `expanded`,
  `extra-expanded`,
  `ultra-expanded`,
  ...GLOBAL_VALUES,
]

export const FONT_SIZES = [
  `xx-small`,
  `x-small`,
  `small`,
  `medium`,
  `large`,
  `x-large`,
  `xx-large`,
  `smaller`,
  `larger`,
  ...GLOBAL_VALUES,
]

export const EXTENTS = [
  `closest-side`,
  `closest-corner`,
  `farthest-side`,
  `farthest-corner`,
]

export const ATTACHMENTS = [`scroll`, `fixed`, `local`]

export const SHAPES = [`circle`, `ellipse`]

export const LINE_HEIGHTS = [`normal`, ...GLOBAL_VALUES]

export const BACKGOUND_SIZES = [`contain`, `cover`, `auto`, ...GLOBAL_VALUES]

export const BACKGROUND_REPEATS = [
  `repeat-x`,
  `repeat-y`,
  `repeat`,
  `space`,
  `round`,
  `no-repeat`,
  ...GLOBAL_VALUES,
]

export const BACKGROUND_CLIPS = [
  `border-box`,
  `padding-box`,
  `content-box`,
  `text`,
  ...GLOBAL_VALUES,
]

export const REPEAT_STYLES = [
  `repeat-x`,
  `repeat-y`,
  `repeat`,
  `space`,
  `round`,
  `no-repeat`,
]

export const QUERY_TEMPLATE = `@media (min-width: #{minWidth})`

export const CONFIG_FIELD_NAMES = Object.freeze({
  DATA: `data`,
  SCOPES: `scopes`,
  RESOLVE: `resolve`,
  BREAKPOINTS: `breakpoints`,
  API: `api`,
  TRANSFORMERS: `transformers`,
})
