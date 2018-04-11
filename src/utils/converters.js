import { compose, cond, equals, flip, multiply, pipe } from 'ramda'
import { concatRight } from 'ramda-adjunct'
import { numericPartOfUnitedNumber, pxToRemOrEmValue } from 'cssapi-units'

import { joinWithNoSpace } from './formatting'
import { divideBy } from './numbers'
import { LENGTH_UNITS, PERCENT_UNIT } from '../const'

const { PX, REM, EM } = LENGTH_UNITS

const toRemEmLength = (unit, baseFontSize, value) =>
  joinWithNoSpace([flip(pxToRemOrEmValue)(baseFontSize)(value), unit])

const toPxLength = value => joinWithNoSpace([value, PX])

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
    [equals(PX), () => toPxLength(value)],
    [equals(REM), () => toRemEmLength(REM, baseFontSize, value)],
    [equals(EM), () => toRemEmLength(EM, baseFontSize, value)],
  ])(unit)

export const mulitplyUnitlessNumbersToDistance = factor =>
  pipe(
    numericPartOfUnitedNumber,
    multiply(factor),
    unitlessNumberToDistance(LENGTH_UNITS.REM, 16)
  )
