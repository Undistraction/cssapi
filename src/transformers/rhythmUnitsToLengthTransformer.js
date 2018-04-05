import { when, pipe, multiply } from 'ramda'
import { numericPartOfUnitedNumber } from 'cssapi-units'
import { unitlessNumberToDistance } from '../utils/converters'
import { isRhythmUnit } from '../utils/predicate'
import { LENGTH_UNITS } from '../const'

const scaleToRems = rhythm =>
  pipe(
    numericPartOfUnitedNumber,
    multiply(rhythm),
    unitlessNumberToDistance(LENGTH_UNITS.REM, 16)
  )

const rhythmUnitsToLengthTransformer = rhythm =>
  when(isRhythmUnit, scaleToRems(rhythm))

export default rhythmUnitsToLengthTransformer
