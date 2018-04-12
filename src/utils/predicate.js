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
} from 'ramda'
import {
  isValidNumber,
  isNotString,
  isNonNegative,
  isString,
  isNotArray,
  isNotNumber,
} from 'ramda-adjunct'
import { isNumberWithUnit } from 'cssapi-units'
import {
  LENGTH_UNITS,
  BORDER_OUTLINE_STYLES,
  BORDER_WIDTHS,
  REGEXP_RHYTHM_UNITS,
  REGEXP_PERCENT_NUMBER,
  DEFAULT_BREAKPOINT,
  REGEXP_COLOR,
  FONT_GENERIC_NAMES,
  FONT_WEIGHTS,
  FONT_STYLES,
  FONT_STRETCHS,
  LINE_HEIGHTS,
  GLOBAL_VALUES,
  REGEXP_MEDIA_QUERY_STRING,
  REGEXP_URL,
  REGEXP_LINEAR_GRADIENT,
  REGEXP_RADIAL_GRADIENT,
  REGEXP_UNNESTED_COMMA,
  EXTENTS,
  SHAPES,
  ANGLE_UNITS,
} from '../const'

/* eslint-disable-next-line no-restricted-globals */
export const isNumberString = both(isString, complement(isNaN))
export const isNotNumberString = complement(isNumberString)

export const isLengthGt = curry((l, v) => compose(gt(__, l), length)(v))

export const isMatch = test

export const isNotMatch = complement(isMatch)

export const isNotZero = complement(equals(0))
export const isNotZeroString = complement(equals)(`0`)

export const isPercentString = pipe(
  when(isNotString, String),
  test(REGEXP_PERCENT_NUMBER)
)

export const isNotPercentString = complement(isPercentString)

export const isValidNonZeroNumber = pipe(
  unless(isString, String),
  both(isNumberString, isNotZeroString)
)

export const isValidNonNegativeNumber = both(isValidNumber, isNonNegative)

export const isFraction = allPass([isValidNonNegativeNumber, isNotZero])

export const isContained = flip(contains)

export const isNotContained = complement(isContained)

export const isBorderOrOutlineStyle = isContained(BORDER_OUTLINE_STYLES)

export const isNotBorderOrOutlineStyle = isNotContained(BORDER_OUTLINE_STYLES)

export const isNotExtent = isNotContained(EXTENTS)

export const isNotShape = isNotContained(SHAPES)

export const isLength = isNumberWithUnit(values(LENGTH_UNITS))

export const isNotLength = complement(isLength)

export const isBorderWidth = isContained(BORDER_WIDTHS)

export const isNotBorderWidth = complement(isBorderWidth)

export const isRhythmUnit = isMatch(REGEXP_RHYTHM_UNITS)

export const isNotRhythmUnit = complement(isRhythmUnit)

export const isNotColor = isNotMatch(REGEXP_COLOR)

export const isAngle = isNumberWithUnit(values(ANGLE_UNITS))

export const isNotAngle = complement(isAngle)

export const isNotGenericFontName = isNotContained(FONT_GENERIC_NAMES)
export const isNotFontWeight = isNotContained(FONT_WEIGHTS)
export const isNotFontStyle = isNotContained(FONT_STYLES)
export const isNotFontStretch = isNotContained(FONT_STRETCHS)
// export const isNotFontSize = isNotContained(FONT_SIZES)
export const isNotLneHeight = isNotContained(LINE_HEIGHTS)

export const isColorPartOfBorderOutlineProp = allPass([
  isNotBorderOrOutlineStyle,
  isNotBorderWidth,
  isNotLength,
])

export const isDefaultBreakpoint = equals(DEFAULT_BREAKPOINT)

export const isNotStringOrArray = both(isNotString, isNotArray)

export const isNotFontSize = v =>
  allPass([
    isNotNumber,
    isNotLength,
    isNotPercentString,
    isNotRhythmUnit,
    isNotContained(GLOBAL_VALUES),
  ])(v)

export const coersedNumberGt5 = pipe(Number, gt(__, 5))

export const isRhythmUnitOrUnitlessNumberGt5 = either(
  isRhythmUnit,
  both(isValidNonZeroNumber, coersedNumberGt5)
)

export const isRhythmUnitOrisValidNonZeroNumber = either(
  isRhythmUnit,
  isValidNonZeroNumber
)

export const isNumberLte5 = lte(__, 5)

export const isBreakpointProvider = both(has(`byName`), has(`byIndex`))

export const isMediaQueryString = test(REGEXP_MEDIA_QUERY_STRING)

export const isUrl = test(REGEXP_URL)
export const isLinearGradient = test(REGEXP_LINEAR_GRADIENT)
export const isRadialGradient = test(REGEXP_RADIAL_GRADIENT)
export const isNotUrl = complement(isUrl)
export const isNotLinearGradient = complement(isLinearGradient)
export const isNotRadialGradient = complement(isRadialGradient)
export const isGradient = either(isLinearGradient, isRadialGradient)
export const isNotGradient = complement(isGradient)

export const isColorPartOfBackgroundColor = allPass([isNotGradient, isNotUrl])
export const isColorPartOfGradient = allPass([
  isNotAngle,
  isNotColor,
  isNotExtent,
  isNotShape,
  isNotPercentString,
])

export const containsTopLevelGroups = test(REGEXP_UNNESTED_COMMA)
