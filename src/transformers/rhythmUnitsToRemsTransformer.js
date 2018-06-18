import { LENGTH_UNITS } from '../const/units'
import keyToValueResolver from '../resolvers/keyToValueResolver'
import { mulitplyUnitlessNumbersToDistance } from '../utils/converters'
import { isRhythmUnit } from '../utils/predicate'
import transformer from './transformer'

const rhythmUnitsToRemsTransformer = transformer(
  isRhythmUnit,
  (value, data, breakpointName) => {
    const rhythm = keyToValueResolver(`rhythm`)(value, data, breakpointName)
    return mulitplyUnitlessNumbersToDistance(
      rhythm,
      data.baseFontSize,
      LENGTH_UNITS.REM
    )(value)
  }
)

export default rhythmUnitsToRemsTransformer
