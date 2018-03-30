import { flip, when, cond, equals, always, both } from 'ramda'
import { pxToRemOrEmValue } from 'cssapi-units'
import { joinWithNoSpace } from '../utils/formatting'
import { isNumberString, isNotZero } from '../utils/predicate'
import { LENGTH_UNITS } from '../const'

const isValidNonZeroNumber = both(isNumberString, isNotZero)

const { PX, REM } = LENGTH_UNITS

const toOutputUnit = (unit, baseFontSize) => v =>
  cond([
    [equals(PX), always(joinWithNoSpace([v, PX]))],
    [
      equals(REM),
      () => joinWithNoSpace([flip(pxToRemOrEmValue)(baseFontSize)(v), REM]),
    ],
  ])(unit)

const lengthTransformer = (unit, baseFontSize = 16) => v =>
  when(isValidNonZeroNumber, toOutputUnit(unit, baseFontSize))(v)

export default lengthTransformer
