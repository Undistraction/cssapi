import { LENGTH_UNITS } from '../const/units'
import transformer from './transformer'
import { isValidNonZeroNumber } from '../utils/predicate'
import { unitlessNumberToDistance } from '../utils/converters'

const unitlessNumberToRemsTransformer = transformer(
  isValidNonZeroNumber,
  (value, data) =>
    unitlessNumberToDistance(LENGTH_UNITS.EM, data.baseFontSize)(value)
)
export default unitlessNumberToRemsTransformer
