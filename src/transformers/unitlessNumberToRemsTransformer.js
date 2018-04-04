import unitlessNumberToLengthTransformer from './unitlessNumberToLengthTransformer'
import { LENGTH_UNITS } from '../const'

const unitlessNumberToRemsTransformer = unitlessNumberToLengthTransformer(
  LENGTH_UNITS.REM
)

export default unitlessNumberToRemsTransformer
