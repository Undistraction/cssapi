export const RE_COLOR = /^(#?([0-9a-f]{3}|[0-9a-f]{6})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))$/i

export const RE_RHYTHM_UNITS = /^-?\d*\.?\d*ru$/

export const RE_START_OF_LINE = /^/gm

export const RE_WHITESPACE = /\s+/

export const RE_PERCENT_NUMBER = /^\d+%$/

export const RE_CAPITAL_LETTERS = /([A-Z])/g

export const RE_MEDIA_QUERY_STRING = /^@media /

export const RE_RADIAL_GRADIENT = /^radial-gradient\(.+\)$/

export const RE_LINEAR_GRADIENT = /^linear-gradient\(.+\)$/

export const RE_URL = /^url\(.+\)$/

export const RE_UNNESTED_COMMA = /,(?![^()]*(?:\([^()]*\))?\))/g

export const RE_ARGUMENTS_OF_CSS_FUNCTION = /^(?:[a-zA-Z\-_\d]*)\((.*)\)$/g

export const RE_CSS_FUNCTION_NAME = /^([a-zA-Z-]*)\(.*\)$/

export const RE_UNNESTED_WHITESPACE = /\s(?![^()]*\))/g

export const RE_COLOR_NAME = /^c:(.*)$/

// Note we exclude values starting `data:` as they might be images
export const RE_TOKEN = /^(?!data:)([a-zA-Z\-_\d]*):(.*)$/

export const RE_CSS_FUNCTION = /^[a-zA-Z-]*\(.*\)$/

export const RE_TRANSFORM_TRANSLATE_FUNCTION = /^translate(?:x|y|z|3d)?\(.*\)$/

export const RE_CALC_FUNCTION = /^calc\(.*\)$/

export const RE_CALC_VALUES = /(-*[0-9a-z.%]+)/g

export const RE_MODIFIED_MQ = /^(?![<@][^<\s]*<)(?!^<default)(?:[@<>]?[a-zA-Z\d]+(?:(?:[+-])\d*\.?\d*(?:em)?)?)(?:<[a-zA-Z\d]+(?:(?:\+|-)\d*\.?\d*(?:em)?)?)?$/
