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
  type,
  unless,
} from 'ramda'
import {
  isValidNumber,
  isNotString,
  isNonNegative,
  isString,
} from 'ramda-adjunct'
import { isNumberWithUnit } from 'cssapi-units'
import {
  LENGTH_UNITS,
  BORDER_OUTLINE_STYLES,
  BORDER_WIDTHS,
  REGEXP_RHYTHM_UNITS,
  REGEXP_PERCENT_NUMBER,
  DEFAULT_BREAKPOINT,
} from '../const'

// eslint-disable-next-line no-restricted-globals
export const isNumberString = complement(isNaN)

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

export const isColorPartOfBorderProp = allPass([
  isNotBorderOrOutlineStyle,
  isNotBorderWidth,
  isNotLength,
])

export const isColorPartOfOutlineProp = allPass([
  isNotBorderOrOutlineStyle,
  isNotLength,
])

export const isDefaultBreakpoint = equals(DEFAULT_BREAKPOINT)
