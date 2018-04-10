import { isRhythmUnit } from '../utils/predicate'
import transformer from './transformer'
import { mulitplyUnitlessNumbersToDistance } from '../utils/converters'
import keyToValueResolver from '../resolvers/keyToValueResolver'

const rhythmUnitsToRemsTransformer = transformer(
  isRhythmUnit,
  (value, data, breakpointName) => {
    const rhythm = keyToValueResolver(`rhythm`)(value, data, breakpointName)
    return mulitplyUnitlessNumbersToDistance(rhythm)(value)
  }
)

export default rhythmUnitsToRemsTransformer
