import rhythmUnitsToLengthTransformer from '../transformers/rhythmUnitsToLengthTransformer'
import calcTransformer from './calcTransformer'
import unitlessNumberToLengthTransformer from './unitlessNumberToLengthTransformer'

const lengthTransformers = [
  // eslint-disable-next-line no-use-before-define
  calcTransformer(rhythmUnitsToLengthTransformer),
  ...[unitlessNumberToLengthTransformer, rhythmUnitsToLengthTransformer],
]

export default lengthTransformers
