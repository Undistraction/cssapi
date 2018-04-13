// eslint-disable-next-line no-useless-escape
export const REGEXP_COLOR = /^(#?([0-9a-f]{3}|[0-9a-f]{6})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i
export const REGEXP_RHYTHM_UNITS = /^^\d*\.?\d*ru$/
export const REGEXP_START_OF_LINE = /^/gm
export const REGEXP_WHITESPACE = /\s+/
export const REGEXP_PERCENT_NUMBER = /^\d+%$/
export const REGEXP_CAPITAL_LETTERS = /([A-Z])/g
export const REGEXP_MEDIA_QUERY_STRING = /^@media /
export const REGEXP_RADIAL_GRADIENT = /^radial-gradient\(.+\)$/
export const REGEXP_LINEAR_GRADIENT = /^linear-gradient\(.+\)$/
export const REGEXP_URL = /^url\(.+\)$/
export const REGEXP_UNNESTED_COMMA = /,(?![^()]*(?:\([^()]*\))?\))/g
export const REGEXP_ARGUMENTS_OF_GRADIENT = /^(?:linear|radial)-gradient\((.*)\)$/g
export const REGEXP_GRADIENT_TYPE = /^(.*)-gradient/
export const REGEXP_UNNESTED_WHITESPACE = /\s(?![^()]*\))/g
