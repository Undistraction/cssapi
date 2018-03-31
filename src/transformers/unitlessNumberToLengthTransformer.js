import { when } from 'ramda'

import { isValidNonZeroNumber } from '../utils/predicate'
import { unitlessNumberToDistance } from '../utils/transformers'

const unitlessNumberToLengthTransformer = (unit, baseFontSize = 16) =>
  when(isValidNonZeroNumber, unitlessNumberToDistance(unit, baseFontSize))

export default unitlessNumberToLengthTransformer
