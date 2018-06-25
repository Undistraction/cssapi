import rhythmUnitsToLengthTransformer from '../transformers/rhythmUnitsToLengthTransformer'
import calcTransformer from './calcTransformer'
import unitlessNumberToLengthTransformer from './unitlessNumberToLengthTransformer'

const lengthTransformers = [
  calcTransformer([
    unitlessNumberToLengthTransformer,
    rhythmUnitsToLengthTransformer,
  ]),
  unitlessNumberToLengthTransformer,
  rhythmUnitsToLengthTransformer,
]

export default lengthTransformers
