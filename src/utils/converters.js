import { compose, cond, equals, flip, multiply, pipe, divide } from 'ramda'
import { concatRight } from 'ramda-adjunct'

import { joinWithNoSpace } from './formatting'
import { divideBy } from './numbers'
import { LENGTH_UNITS, PERCENT_UNIT } from '../const/units'
import { numericPartOfUnitedNumber, elementsOfUnitedNumber } from './parse'
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
