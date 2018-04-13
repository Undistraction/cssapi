import rhythmUnitsToLengthTransformer from '../transformers/rhythmUnitsToLengthTransformer'
import unitlessNumberToLengthTransformer from './unitlessNumberToLengthTransformer'

const lengthTransformer = [
  unitlessNumberToLengthTransformer,
  rhythmUnitsToLengthTransformer,
]

export default lengthTransformer
