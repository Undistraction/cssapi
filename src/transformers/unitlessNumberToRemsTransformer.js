import { LENGTH_UNITS } from '../const/units'
import transformer from './transformer'
import { isValidNonZeroNumber } from '../utils/predicate'
import { unitlessNumberToDistance } from '../utils/converters'

const unitlessNumberToRemsTransformer = transformer(
  isValidNonZeroNumber,
  (value, data) => {
    const r = unitlessNumberToDistance(LENGTH_UNITS.REM, data.baseFontSize)(
      value
    )
    return r
  }
)
export default unitlessNumberToRemsTransformer
