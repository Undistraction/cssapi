import unitlessNumberToLengthTransformer from './unitlessNumberToLengthTransformer'
import { LENGTH_UNITS } from '../const'

const unitlessNumberToRemsTransformer = unitlessNumberToLengthTransformer(
  LENGTH_UNITS.PX
)

export default unitlessNumberToRemsTransformer
