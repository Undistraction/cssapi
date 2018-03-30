import { both, complement, equals } from 'ramda'
import { isString } from 'ramda-adjunct'

// eslint-disable-next-line import/prefer-default-export, no-restricted-globals
export const isNumberString = both(isString, complement(isNaN))

export const isNotZero = complement(equals(0))
