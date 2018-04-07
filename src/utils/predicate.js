import {
  test,
  both,
  complement,
  equals,
  compose,
  toString,
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
} from 'ramda'
import {
  isValidNumber,
  isNotString,
  isNonNegative,
  isString,
  isNotArray,
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
  FONT_SIZES,
} from '../const'

/* eslint-disable-next-line no-restricted-globals */
export const isNumberString = both(isString, complement(isNaN))
export const isNotNumberString = complement(isNumberString)

export const isLengthGt = curry((l, v) => compose(gt(__, l), length)(v))

export const isMatch = test

export const isNotMatch = complement(isMatch)

export const isNotZero = complement(equals(0))
export const isNotZeroString = complement(equals)(`0`)

export const isPercentString = compose(
  test(REGEXP_PERCENT_NUMBER),
  when(isNotString, toString)
)

export const isValidNonZeroNumber = pipe(
  unless(isString, toString),
  both(isNumberString, isNotZeroString)
)

export const isValidNonNegativeNumber = both(isValidNumber, isNonNegative)

export const isFraction = allPass([isValidNonNegativeNumber, isNotZero])

export const isContained = flip(contains)

export const isNotContained = complement(isContained)

export const isBorderOrOutlineStyle = isContained(BORDER_OUTLINE_STYLES)

export const isNotBorderOrOutlineStyle = isNotContained(BORDER_OUTLINE_STYLES)

export const isLength = isNumberWithUnit(values(LENGTH_UNITS))

export const isNotLength = complement(isLength)

export const isBorderWidth = isContained(BORDER_WIDTHS)

export const isNotBorderWidth = complement(isBorderWidth)

export const isRhythmUnit = isMatch(REGEXP_RHYTHM_UNITS)

export const isNotColor = isNotMatch(REGEXP_COLOR)

export const isNotGenericFontName = isNotContained(FONT_GENERIC_NAMES)
export const isNotFontWeight = isNotContained(FONT_WEIGHTS)
export const isNotFontStyle = isNotContained(FONT_STYLES)
export const isNotFontStretch = isNotContained(FONT_STRETCHS)
export const isNotFontSize = isNotContained(FONT_SIZES)
export const isNotLneHeight = isNotContained(LINE_HEIGHTS)

export const isColorPartOfBorderOutlineProp = allPass([
  isNotBorderOrOutlineStyle,
  isNotBorderWidth,
  isNotLength,
])

export const isColorPartOfFontProp = allPass([])

export const isDefaultBreakpoint = equals(DEFAULT_BREAKPOINT)

export const isNotStringOrArray = both(isNotString, isNotArray)