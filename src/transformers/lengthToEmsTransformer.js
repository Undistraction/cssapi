import unitlessNumberToEmsTransformer from './unitlessNumberToEmsTransformer'
import rhythmUnitsToEmsTransformer from '../transformers/rhythmUnitsToEmsTransformer'

const lengthToRemsTransformer = [
  unitlessNumberToEmsTransformer,
  rhythmUnitsToEmsTransformer,
]

export default lengthToRemsTransformer
