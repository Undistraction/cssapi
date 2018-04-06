import {
  compose,
  cond,
  toString,
  equals,
  always,
  flip,
  multiply,
  pipe,
} from 'ramda'
import { concatRight } from 'ramda-adjunct'
import { numericPartOfUnitedNumber, pxToRemOrEmValue } from 'cssapi-units'

import { joinWithNoSpace } from './formatting'
import { divideBy } from './numbers'
import { LENGTH_UNITS, PERCENT_UNIT } from '../const'

const { PX, REM } = LENGTH_UNITS

export const percentageStringToRatio = compose(
  divideBy(100),
  numericPartOfUnitedNumber
)

export const ratioToPercentString = compose(
  concatRight(PERCENT_UNIT),
  toString,
  multiply(100)
)

export const unitlessNumberToDistance = (unit, baseFontSize) => v =>
  cond([
    [equals(PX), always(joinWithNoSpace([v, PX]))],
    [
      equals(REM),
      () => joinWithNoSpace([flip(pxToRemOrEmValue)(baseFontSize)(v), REM]),
    ],
  ])(unit)

export const mulitplyUnitlessNumbersToDistance = factor =>
  pipe(
    numericPartOfUnitedNumber,
    multiply(factor),
    unitlessNumberToDistance(LENGTH_UNITS.REM, 16)
  )
