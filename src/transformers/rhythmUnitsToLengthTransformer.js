import { both, when, pipe, multiply } from 'ramda'
import { isString } from 'ramda-adjunct'
import { numericPartOfUnitedNumber } from 'cssapi-units'
import { unitlessNumberToDistance } from '../utils/converters'
import { isMatch } from '../utils/predicate'
import { REGEXP_RHYTHM_UNITS, LENGTH_UNITS } from '../const'

const rhythmUnitsToLengthTransformer = resolvedValue =>
  when(
    both(isString, isMatch(REGEXP_RHYTHM_UNITS)),
    pipe(
      numericPartOfUnitedNumber,
      multiply(resolvedValue),
      unitlessNumberToDistance(LENGTH_UNITS.REM, 16)
    )
  )

export default rhythmUnitsToLengthTransformer
