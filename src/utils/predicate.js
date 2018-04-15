import {
  test,
  both,
  complement,
  equals,
  compose,
  when,
  allPass,
  contains,
  flip,
  values,
  curry,
  length,
  gt,
  __,
  pipe,
  unless,
  either,
  lte,
  has,
  join,
} from 'ramda'
import {
  isValidNumber,
  isNotString,
  isNonNegative,
  isString,
  isNotArray,
  isNotNumber,
  ensureArray,
} from 'ramda-adjunct'
import { CONFIG_FIELD_NAMES, DEFAULT_BREAKPOINT_NAME } from '../const'
import {
  BORDER_OUTLINE_STYLES,
  BORDER_WIDTHS,
  FONT_GENERIC_NAMES,
  FONT_WEIGHTS,
  FONT_STYLES,
  FONT_STRETCHS,
  LINE_HEIGHTS,
  GLOBAL_VALUES,
  EXTENTS,
  SHAPES,
  ATTACHMENTS,
  BACKGOUND_SIZES,
  BACKGROUND_REPEATS,
  BACKGROUND_CLIPS,
  REPEAT_STYLES,
  BOX_SHADOW_KEYWORDS,
} from '../const/styles'
import { LENGTH_UNITS, ANGLE_UNITS } from '../const/units'
import {
  RE_COLOR,
  RE_RHYTHM_UNITS,
  RE_PERCENT_NUMBER,
  RE_URL,
  RE_LINEAR_GRADIENT,
  RE_RADIAL_GRADIENT,
  RE_UNNESTED_COMMA,
  RE_MEDIA_QUERY_STRING,
  RE_COLOR_NAME,
  RE_NAME_VALUE,
  RE_CSS_FUNCTION,
  RE_UNNESTED_WHITESPACE,
} from '../const/regexp'
import { joinWithPipe } from './formatting'

const { SCOPES } = CONFIG_FIELD_NAMES

// -----------------------------------------------------------------------------
// Misc
// -----------------------------------------------------------------------------

export const isDefaultBreakpoint = equals(DEFAULT_BREAKPOINT_NAME)

// -----------------------------------------------------------------------------
// Numeric
// -----------------------------------------------------------------------------

export const isNumberLte5 = lte(__, 5)

export const isNotZero = complement(equals(0))

export const coersedNumberGt5 = pipe(Number, gt(__, 5))

// -----------------------------------------------------------------------------
// List
// -----------------------------------------------------------------------------

export const isContained = flip(contains)

export const isNotContained = complement(isContained)

export const isLengthGt = curry((l, v) => compose(gt(__, l), length)(v))

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export const isNumberWithUnit = curry((units, value) => {
  const regex = `^-?\\d+(?:.\\d+)?(?:${join(`|`, units)})$`
  return new RegExp(regex).test(value)
})

/* eslint-disable-next-line no-restricted-globals */
export const isNumberString = both(isString, complement(isNaN))

export const isNotNumberString = complement(isNumberString)

export const isMatch = test

export const isNotMatch = complement(isMatch)

export const isNotZeroString = complement(equals)(`0`)

export const isPercentString = pipe(
  when(isNotString, String),
  test(RE_PERCENT_NUMBER)
)

export const isValidNonZeroNumber = pipe(
  unless(isString, String),
  both(isNumberString, isNotZeroString)
)

export const isNotPercentString = complement(isPercentString)

export const isValidNonNegativeNumber = both(isValidNumber, isNonNegative)

export const isFraction = allPass([isValidNonNegativeNumber, isNotZero])

export const isLength = isNumberWithUnit(values(LENGTH_UNITS))

export const isNotLength = complement(isLength)

export const isNotColor = both(
  isNotMatch(RE_COLOR),
  complement(equals)(`transparent`)
)

export const isRhythmUnit = isMatch(RE_RHYTHM_UNITS)

export const isNotRhythmUnit = complement(isRhythmUnit)

export const isAngle = isNumberWithUnit(values(ANGLE_UNITS))

export const isNotAngle = complement(isAngle)

export const isNotStringOrArray = both(isNotString, isNotArray)

export const isUrl = test(RE_URL)

export const isLinearGradient = test(RE_LINEAR_GRADIENT)

export const isRadialGradient = test(RE_RADIAL_GRADIENT)

export const isNotUrl = complement(isUrl)

export const isNotLinearGradient = complement(isLinearGradient)

export const isNotRadialGradient = complement(isRadialGradient)

export const isGradient = either(isLinearGradient, isRadialGradient)

export const isNotGradient = complement(isGradient)

export const isColorName = test(RE_COLOR_NAME)

export const isNameValue = test(RE_NAME_VALUE)

export const isNotNameValue = complement(isNameValue)

export const isCSSFunction = test(RE_CSS_FUNCTION)

// export const isNameValueWithName = name => test(new RegExp(`^${name}:(.*)$`))

export const isNameValueWithName = names => value => {
  const namesString = compose(joinWithPipe, ensureArray)(names)
  return test(new RegExp(`^[${namesString}]:(.*)$`), value)
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

export const isBorderOrOutlineStyle = isContained(BORDER_OUTLINE_STYLES)

export const isNotBorderOrOutlineStyle = isNotContained(BORDER_OUTLINE_STYLES)

export const isNotExtent = isNotContained(EXTENTS)

export const isNotShape = isNotContained(SHAPES)

export const isNotBackgroundSize = isNotContained(BACKGOUND_SIZES)

export const isNotAttachement = isNotContained(ATTACHMENTS)

export const isBorderWidth = isContained(BORDER_WIDTHS)

export const isNotBorderWidth = complement(isBorderWidth)

export const isNotBackgroundRepeat = isNotContained(BACKGROUND_REPEATS)

export const isNotBackgroundClip = isNotContained(BACKGROUND_CLIPS)

export const isNotRepeatStyle = isNotContained(REPEAT_STYLES)

export const isNotBoxShadowKeyword = isNotContained(BOX_SHADOW_KEYWORDS)

export const isNotGenericFontName = isNotContained(FONT_GENERIC_NAMES)

export const isNotFontWeight = isNotContained(FONT_WEIGHTS)

export const isNotFontStyle = isNotContained(FONT_STYLES)

export const isNotFontStretch = isNotContained(FONT_STRETCHS)

export const isNotLneHeight = isNotContained(LINE_HEIGHTS)

// -----------------------------------------------------------------------------
// Filters
// -----------------------------------------------------------------------------

export const isColorPartOfBorderOutlineProp = allPass([
  isNotBorderOrOutlineStyle,
  isNotBorderWidth,
  isNotLength,
])

export const isColorPartOfBackgroundColor = allPass([isNotGradient, isNotUrl])

export const isColorPartOfGradient = allPass([
  isNotColor,
  isNotAngle,
  isNotExtent,
  isNotShape,
  isNotPercentString,
])
export const isColorPartOfBackground = allPass([
  isNotColor,
  isNotGradient,
  isNotUrl,
  isNotLength,
  isNotNumberString,
  isNotRhythmUnit,
  isNotAttachement,
  isNotBackgroundSize,
  isNotBackgroundRepeat,
  isNotBackgroundClip,
  isNotRepeatStyle,
])

export const isColorPartOfBoxShadow = allPass([
  isNotColor,
  isNotLength,
  isNotRhythmUnit,
  isNotNumberString,
  isNotBoxShadowKeyword,
])

export const isNotFontSize = v =>
  allPass([
    isNotNumber,
    isNotNumberString,
    isNotLength,
    isNotPercentString,
    isNotRhythmUnit,
    isNotContained(GLOBAL_VALUES),
  ])(v)

export const isRhythmUnitOrUnitlessNumberGt5 = either(
  isRhythmUnit,
  both(isValidNonZeroNumber, coersedNumberGt5)
)

export const isRhythmUnitOrisValidNonZeroNumber = either(
  isRhythmUnit,
  isValidNonZeroNumber
)

export const isBreakpointProvider = both(has(`byName`), has(`byIndex`))

export const isMediaQueryString = test(RE_MEDIA_QUERY_STRING)

export const containsTopLevelGroups = test(RE_UNNESTED_COMMA)

export const isUnitRemOrEm = contains(__, [LENGTH_UNITS.EM, LENGTH_UNITS.REM])

export const hasScopes = has(SCOPES)

export const hasNoScopes = complement(hasScopes)

export const hasUnnestedWhitespace = test(RE_UNNESTED_WHITESPACE)
