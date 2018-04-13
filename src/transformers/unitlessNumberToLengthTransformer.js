import { isValidNonZeroNumber } from '../utils/predicate'
import { unitlessNumberToDistance } from '../utils/converters'
import transformer from './transformer'
import keysToValueResolver from '../resolvers/keysToValuesResolver'

const unitlessNumberToLengthTransformer = transformer(
  isValidNonZeroNumber,
  (value, data, breakpointName) => {
    const [lengthUnit, baseFontSize] = keysToValueResolver([
      `lengthUnit`,
      `baseFontSize`,
    ])(value, data, breakpointName)
    return unitlessNumberToDistance(lengthUnit, baseFontSize)(value)
  }
)

export default unitlessNumberToLengthTransformer
