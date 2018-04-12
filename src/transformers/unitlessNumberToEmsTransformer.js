import unitlessNumberToLengthTransformer from './unitlessNumberToLengthTransformer'
import { LENGTH_UNITS } from '../const/units'

const unitlessNumberToEmsTransformer = unitlessNumberToLengthTransformer(
  LENGTH_UNITS.EM
)

export default unitlessNumberToEmsTransformer
