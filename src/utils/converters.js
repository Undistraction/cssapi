import { compose, cond, divide, equals, flip, multiply, pipe } from 'ramda'
import { concatRight, isNumber } from 'ramda-adjunct'
import { LENGTH_UNITS, PERCENT_UNIT } from '../const/units'
import { joinWithNoSpace } from './formatting'
import { divideBy } from './numbers'
import { elementsOfUnitedNumber, numericPartOfUnitedNumber } from './parse'
import { isUnitRemOrEm } from './predicate'

const { PX, REM, EM } = LENGTH_UNITS

export const pxValueToRemOrEmValue = (value, baseFontSize) =>
  divide(value, baseFontSize)

export const pxValueToRemOrEmString = (unit, baseFontSize, value) =>
  joinWithNoSpace([flip(pxValueToRemOrEmValue)(baseFontSize)(value), unit])

export const pxValueToPxString = value => joinWithNoSpace([value, PX])

export const percentageStringToRatio = compose(
  divideBy(100),
  numericPartOfUnitedNumber
)

export const ratioToPercentString = compose(
  concatRight(PERCENT_UNIT),
  String,
  multiply(100)
)

export const unitlessNumberToDistance = (unit, baseFontSize) => value =>
  cond([
    [equals(PX), () => pxValueToPxString(value)],
    [equals(REM), () => pxValueToRemOrEmString(REM, baseFontSize, value)],
    [equals(EM), () => pxValueToRemOrEmString(EM, baseFontSize, value)],
  ])(unit)

export const mulitplyUnitlessNumbersToDistance = (factor, unit, baseFontSize) =>
  pipe(
    numericPartOfUnitedNumber,
    multiply(factor),
    unitlessNumberToDistance(unit, baseFontSize)
  )

export const remOrEmToPxValue = (value, baseFontSize) =>
  multiply(value, baseFontSize)

export const unitedDimensionToUnitlessPixelValue = (value, baseFontSize) => {
  const [number, unit] = elementsOfUnitedNumber(value)
  return isUnitRemOrEm(unit) ? remOrEmToPxValue(number, baseFontSize) : number
}

export const adjustNumberWithUnit = (f, value) => {
  // In case a unitless number is passed in
  if (isNumber(value)) return f(value)
  // Otherwise calculate using the numeric part and reattach the unit
  const [n, unit] = elementsOfUnitedNumber(value)
  return `${f(n)}${unit}`
}
