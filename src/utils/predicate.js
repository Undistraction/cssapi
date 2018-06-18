import {
  anyPass,
  both,
  complement,
  compose,
  contains,
  curry,
  either,
  equals,
  flip,
  gt,
  has,
  indexOf,
  length,
  pipe,
  prop,
  test,
  unless,
  values,
  __,
} from 'ramda'
import {
  ensureArray,
  isArray,
  isNotArray,
  isNotString,
  isPositive,
  isString,
  isValidNumber,
} from 'ramda-adjunct'
import {
  AT_MODIFIER,
  DEFAULT_BREAKPOINT_NAME,
  GT_MODIFIER,
  LT_MODIFIER,
  NEGATIVE_OFFSET,
  POSITIVE_OFFSET,
} from '../const/breakpoints'
import { CONFIG_FIELD_NAMES } from '../const/config'
import {
  RE_CALC_FUNCTION,
  RE_CSS_FUNCTION,
  RE_LINEAR_GRADIENT,
  RE_MEDIA_QUERY_STRING,
  RE_MODIFIED_MQ,
  RE_PERCENT_NUMBER,
  RE_RADIAL_GRADIENT,
  RE_RHYTHM_UNITS,
  RE_TOKEN,
  RE_TRANSFORM_TRANSLATE_FUNCTION,
  RE_UNNESTED_COMMA,
  RE_UNNESTED_WHITESPACE,
  RE_URL,
} from '../const/regexp'
import { LENGTH_UNITS } from '../const/units'
import { joinWithPipe } from './formatting'

const { SCOPES } = CONFIG_FIELD_NAMES

// -----------------------------------------------------------------------------
// List
// -----------------------------------------------------------------------------

export const isContained = flip(contains)

export const isLengthGt = curry((l, v) => compose(gt(__, l), length)(v))

export const isLengthEqualTo = curry((l, v) => compose(equals(l), length)(v))

// -----------------------------------------------------------------------------
// Misc
// -----------------------------------------------------------------------------

export const isSingletonArray = both(isArray, isLengthEqualTo(1))

export const isDefaultBreakpoint = equals(DEFAULT_BREAKPOINT_NAME)

export const isValidMqValue = anyPass([
  isSingletonArray,
  isString,
  isValidNumber,
])

// -----------------------------------------------------------------------------
// Numeric
// -----------------------------------------------------------------------------

export const isNotZero = complement(equals(0))

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export const isNumberWithUnit = curry((units, value) => {
  const possibleUnits = compose(joinWithPipe, ensureArray)(units)
  const regExp = new RegExp(`^-?\\d+(?:.\\d+)?(?:${possibleUnits})$`)
  return test(regExp, value)
})

export const isEmString = isNumberWithUnit([LENGTH_UNITS.EM])

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

export const isToken = test(RE_TOKEN)

export const isCSSFunction = test(RE_CSS_FUNCTION)
export const isTransformTranslateFunction = test(
  RE_TRANSFORM_TRANSLATE_FUNCTION
)

export const isCalcFunction = test(RE_CALC_FUNCTION)

export const isTokenWithName = names => value => {
  const possibleNames = compose(joinWithPipe, ensureArray)(names)
  const regExp = new RegExp(`^(${possibleNames}):(.*)$`)
  return test(regExp, value)
}

export const isBreakpointProvider = both(has(`byName`), has(`byIndex`))

export const isMediaQueryString = test(RE_MEDIA_QUERY_STRING)

export const isGroup = test(RE_UNNESTED_COMMA)

export const isUnitRemOrEm = isContained([LENGTH_UNITS.EM, LENGTH_UNITS.REM])

export const hasScopes = has(SCOPES)

export const hasNoScopes = complement(hasScopes)

export const hasUnnestedWhitespace = test(RE_UNNESTED_WHITESPACE)

export const isValidModifiedMq = test(RE_MODIFIED_MQ)

export const modifierIsLtModifier = pipe(prop(`modifier`), equals(LT_MODIFIER))

export const modifierIsGtModifier = pipe(prop(`modifier`), equals(GT_MODIFIER))

export const modifierIsAtModifier = pipe(prop(`modifier`), equals(AT_MODIFIER))

export const hasPositiveOffset = contains(POSITIVE_OFFSET)

export const hasNegativeOffset = contains(NEGATIVE_OFFSET)

export const isGroupString = both(isString, isGroup)

export const isRange = value => indexOf(LT_MODIFIER, value) > 1

export const hasNoModifier = complement(has(`modifier`))
