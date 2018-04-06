import { isRhythmUnit } from '../utils/predicate'
import transformer from './transformer'
import { mulitplyUnitlessNumbersToDistance } from '../utils/converters'

const rhythmUnitsToLengthTransformer = rhythm =>
  transformer(isRhythmUnit, mulitplyUnitlessNumbersToDistance(rhythm))

export default rhythmUnitsToLengthTransformer
