import {
  match,
  curry,
  both,
  complement,
  equals,
  compose,
  either,
  toString,
  when,
  allPass,
} from 'ramda'
import {
  isString,
  isNotEmpty,
  isValidNumber,
  isNotString,
  isNonNegative,
} from 'ramda-adjunct'

export const isMatch = curry((regExp, value) =>
  compose(isNotEmpty, match(regExp))(value)
)

export const isNotMatch = complement(isMatch)

// eslint-disable-next-line import/prefer-default-export, no-restricted-globals
export const isNumberString = both(isString, complement(isNaN))

export const isNotZero = complement(equals(0))

export const isPercentString = compose(
  isMatch(/^\d+%$/),
  when(isNotString, toString)
)

export const isValidNonZeroNumber = both(
  either(isNumberString, isValidNumber),
  isNotZero
)

export const isValidNonNegativeNumber = both(isValidNumber, isNonNegative)

export const isFraction = allPass([isValidNonNegativeNumber, isNotZero])
