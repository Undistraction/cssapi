import { when } from 'ramda'

import { isValidNonZeroNumber } from '../utils/predicate'
import { unitlessNumberToDistance } from '../utils/converters'

const unitlessNumberToLengthTransformer = (unit, baseFontSize = 16) =>
  when(isValidNonZeroNumber, unitlessNumberToDistance(unit, baseFontSize))

export default unitlessNumberToLengthTransformer
