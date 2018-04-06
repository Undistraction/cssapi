import unitlessNumberToRemsTransformer from './unitlessNumberToRemsTransformer'
import rhythmUnitsToRemsTransformer from '../transformers/rhythmUnitsToRemsTransformer'

const lengthTransformer = [
  unitlessNumberToRemsTransformer,
  rhythmUnitsToRemsTransformer,
]

export default lengthTransformer
