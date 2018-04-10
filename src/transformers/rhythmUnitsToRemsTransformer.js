import { isRhythmUnit } from '../utils/predicate'
import transformer from './transformer'
import { mulitplyUnitlessNumbersToDistance } from '../utils/converters'
import keyToValueTransformer from './keyToValueTransformer'

const rhythmUnitsToRemsTransformer = transformer(
  isRhythmUnit,
  (value, data, breakpointName) => {
    const rhythm = keyToValueTransformer(`rhythm`)(value, data, breakpointName)
    return mulitplyUnitlessNumbersToDistance(rhythm)(value)
  }
)

export default rhythmUnitsToRemsTransformer
