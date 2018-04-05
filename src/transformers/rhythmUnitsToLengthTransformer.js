import { when, pipe, multiply } from 'ramda'
import { numericPartOfUnitedNumber } from 'cssapi-units'
import { unitlessNumberToDistance } from '../utils/converters'
import { isRhythmUnit } from '../utils/predicate'
import { LENGTH_UNITS } from '../const'

const rhythmUnitsToLengthTransformer = resolvedValue =>
  when(
    isRhythmUnit,
    pipe(
      numericPartOfUnitedNumber,
      multiply(resolvedValue),
      unitlessNumberToDistance(LENGTH_UNITS.REM, 16)
    )
  )

export default rhythmUnitsToLengthTransformer
