export const RE_COLOR = /^(#?([0-9a-f]{3}|[0-9a-f]{6})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/i

export const RE_RHYTHM_UNITS = /^^\d*\.?\d*ru$/

export const RE_START_OF_LINE = /^/gm

export const RE_WHITESPACE = /\s+/

export const RE_PERCENT_NUMBER = /^\d+%$/

export const RE_CAPITAL_LETTERS = /([A-Z])/g

export const RE_MEDIA_QUERY_STRING = /^@media /

export const RE_RADIAL_GRADIENT = /^radial-gradient\(.+\)$/

export const RE_LINEAR_GRADIENT = /^linear-gradient\(.+\)$/

export const RE_URL = /^url\(.+\)$/

export const RE_UNNESTED_COMMA = /,(?![^()]*(?:\([^()]*\))?\))/g

export const RE_ARGUMENTS_OF_GRADIENT = /^(?:linear|radial)-gradient\((.*)\)$/g

export const RE_GRADIENT_TYPE = /^(.*)-gradient/

export const RE_UNNESTED_WHITESPACE = /\s(?![^()]*\))/g
