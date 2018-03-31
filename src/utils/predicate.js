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
} from 'ramda'
import { isString, isNotEmpty, isValidNumber, isNotString } from 'ramda-adjunct'

export const isMatch = curry((regExp, value) =>
  compose(isNotEmpty, match(regExp))(value)
)

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
