import rhythmUnitsToEmsTransformer from '../transformers/rhythmUnitsToEmsTransformer'
import unitlessNumberToEmsTransformer from './unitlessNumberToEmsTransformer'

const lengthToRemsTransformer = [
  unitlessNumberToEmsTransformer,
  rhythmUnitsToEmsTransformer,
]

export default lengthToRemsTransformer
