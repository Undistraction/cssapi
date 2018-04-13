import { isValidNonZeroNumber } from '../utils/predicate'
import { unitlessNumberToDistance } from '../utils/converters'
import transformer from './transformer'

const unitlessNumberToLengthTransformer = transformer(
  isValidNonZeroNumber,
  (value, data) => {
    const r = unitlessNumberToDistance(data.unit, data.baseFontSize)(value)
    return r
  }
)

export default unitlessNumberToLengthTransformer
