import unitlessNumberToLengthTransformer from './unitlessNumberToLengthTransformer'
import { LENGTH_UNITS } from '../const/units'

const unitlessNumberToRemsTransformer = unitlessNumberToLengthTransformer(
  LENGTH_UNITS.PX
)

export default unitlessNumberToRemsTransformer
