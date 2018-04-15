import {
  test,
  both,
  complement,
  equals,
  compose,
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
  has,
} from 'ramda'
import {
  isValidNumber,
  isNotString,
  isString,
  isNotArray,
  ensureArray,
  isPositive,
} from 'ramda-adjunct'
import { DEFAULT_BREAKPOINT_NAME } from '../const/breakpoints'
import { CONFIG_FIELD_NAMES } from '../const/config'
import { LENGTH_UNITS } from '../const/units'
import {
  RE_RHYTHM_UNITS,
  RE_PERCENT_NUMBER,
  RE_URL,
  RE_LINEAR_GRADIENT,
  RE_RADIAL_GRADIENT,
  RE_UNNESTED_COMMA,
  RE_MEDIA_QUERY_STRING,
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

export const isNotZero = complement(equals(0))

// -----------------------------------------------------------------------------
// List
// -----------------------------------------------------------------------------

export const isContained = flip(contains)

export const isLengthGt = curry((l, v) => compose(gt(__, l), length)(v))

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export const isNumberWithUnit = curry((units, value) => {
  const possibleUnits = compose(joinWithPipe, ensureArray)(units)
  const regExp = new RegExp(`^-?\\d+(?:.\\d+)?(?:${possibleUnits})$`)
  return test(regExp, value)
})

/* eslint-disable-next-line no-restricted-globals */
export const isNumberString = both(isString, complement(isNaN))

export const isNotZeroString = complement(equals)(`0`)

export const isPercentString = pipe(
  unless(isString, String),
  test(RE_PERCENT_NUMBER)
)

export const isValidNonZeroNumber = pipe(
  unless(isString, String),
  both(isNumberString, isNotZeroString)
)

export const isValidPositiveNumber = both(isValidNumber, isPositive)

export const isLength = isNumberWithUnit(values(LENGTH_UNITS))

export const isRhythmUnit = test(RE_RHYTHM_UNITS)

export const isNotStringOrArray = both(isNotString, isNotArray)

export const isUrl = test(RE_URL)

export const isLinearGradient = test(RE_LINEAR_GRADIENT)

export const isRadialGradient = test(RE_RADIAL_GRADIENT)

export const isGradient = either(isLinearGradient, isRadialGradient)

export const isNameValue = test(RE_NAME_VALUE)

export const isCSSFunction = test(RE_CSS_FUNCTION)

export const isNameValueWithName = names => value => {
  const possibleNames = compose(joinWithPipe, ensureArray)(names)
  const regExp = new RegExp(`^[${possibleNames}]:(.*)$`)
  return test(regExp, value)
}

export const isBreakpointProvider = both(has(`byName`), has(`byIndex`))

export const isMediaQueryString = test(RE_MEDIA_QUERY_STRING)

export const isGroups = test(RE_UNNESTED_COMMA)

export const isUnitRemOrEm = isContained([LENGTH_UNITS.EM, LENGTH_UNITS.REM])

export const hasScopes = has(SCOPES)

export const hasNoScopes = complement(hasScopes)

export const hasUnnestedWhitespace = test(RE_UNNESTED_WHITESPACE)
