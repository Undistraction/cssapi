import {
  test,
  both,
  complement,
  equals,
  compose,
  either,
  toString,
  when,
  allPass,
  contains,
  flip,
  values,
} from 'ramda'
import {
  isString,
  isValidNumber,
  isNotString,
  isNonNegative,
} from 'ramda-adjunct'
import { isNumberWithUnit } from 'cssapi-units'
import { LENGTH_UNITS, BORDER_OUTLINE_STYLES, BORDER_WIDTHS } from '../const'

export const isMatch = test
export const isNotMatch = complement(isMatch)
// eslint-disable-next-line import/prefer-default-export, no-restricted-globals
export const isNumberString = both(isString, complement(isNaN))
export const isNotZero = complement(equals(0))
export const isPercentString = compose(
  test(/^\d+%$/),
  when(isNotString, toString)
)
export const isValidNonZeroNumber = both(
  either(isNumberString, isValidNumber),
  isNotZero
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
export const isColorPartOfBorderProp = allPass([
  isNotBorderOrOutlineStyle,
  isNotBorderWidth,
  isNotLength,
])
export const isColorPartOfOutlineProp = allPass([
  isNotBorderOrOutlineStyle,
  isNotLength,
])
