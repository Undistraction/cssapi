import { prop } from 'ramda'
import { isRhythmUnit } from '../utils/predicate'
import transformer from './transformer'
import { mulitplyUnitlessNumbersToDistance } from '../utils/converters'

const rhythmUnitsToRemsTransformer = transformer(
  isRhythmUnit,
  (value, data) => {
    const rhythm = prop(`rhythm`)(data)
    return mulitplyUnitlessNumbersToDistance(rhythm)(value)
  }
)

export default rhythmUnitsToRemsTransformer
