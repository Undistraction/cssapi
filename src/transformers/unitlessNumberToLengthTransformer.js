import { isValidNonZeroNumber } from '../utils/predicate'
import { unitlessNumberToDistance } from '../utils/converters'
import transformer from './transformer'

const unitlessNumberToLengthTransformer = (unit, baseFontSize = 16) =>
  transformer(
    isValidNonZeroNumber,
    unitlessNumberToDistance(unit, baseFontSize)
  )

export default unitlessNumberToLengthTransformer
