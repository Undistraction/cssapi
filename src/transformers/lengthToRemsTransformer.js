import unitlessNumberToRemsTransformer from './unitlessNumberToRemsTransformer'
import rhythmUnitsToRemsTransformer from '../transformers/rhythmUnitsToRemsTransformer'

const lengthToRemsTransformer = [
  unitlessNumberToRemsTransformer,
  rhythmUnitsToRemsTransformer,
]

export default lengthToRemsTransformer
