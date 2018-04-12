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
} from 'ramda-adjunct'
import {
  DEFAULT_BREAKPOINT_NAME,
} from '../const'
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
import {
  LENGTH_UNITS,
  ANGLE_UNITS,
} from '../const/units'
import {
  REGEXP_COLOR,
  REGEXP_RHYTHM_UNITS,
  REGEXP_PERCENT_NUMBER,
  REGEXP_URL,
  REGEXP_LINEAR_GRADIENT,
  REGEXP_RADIAL_GRADIENT,
  REGEXP_UNNESTED_COMMA,
  REGEXP_MEDIA_QUERY_STRING,
} from '../const/regexp'

export const isNumberWithUnit = curry((units, value) => {
  const regex = `^-?\\d+(?:.\\d+)?(?:${join(`|`, units)})$`
  return new RegExp(regex).test(value)
})

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

export const isNotBackgroundSize = isNotContained(BACKGOUND_SIZES)

export const isNotAttachement = isNotContained(ATTACHMENTS)

export const isLength = isNumberWithUnit(values(LENGTH_UNITS))

export const isNotLength = complement(isLength)

export const isBorderWidth = isContained(BORDER_WIDTHS)

export const isNotBorderWidth = complement(isBorderWidth)

export const isRhythmUnit = isMatch(REGEXP_RHYTHM_UNITS)

export const isNotRhythmUnit = complement(isRhythmUnit)

export const isNotColor = both(
  isNotMatch(REGEXP_COLOR),
  complement(equals)(`transparent`)
)

export const isAngle = isNumberWithUnit(values(ANGLE_UNITS))

export const isNotAngle = complement(isAngle)

export const isNotBackgroundRepeat = isNotContained(BACKGROUND_REPEATS)

export const isNotBackgroundClip = isNotContained(BACKGROUND_CLIPS)

export const isNotRepeatStyle = isNotContained(REPEAT_STYLES)

export const isNotBoxShadowKeyword = isNotContained(BOX_SHADOW_KEYWORDS)

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

export const isDefaultBreakpoint = equals(DEFAULT_BREAKPOINT_NAME)

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

export const containsTopLevelGroups = test(REGEXP_UNNESTED_COMMA)
