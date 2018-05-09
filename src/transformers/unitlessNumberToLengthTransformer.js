import keysToValueResolver from '../resolvers/keysToValuesResolver'
import { unitlessNumberToDistance } from '../utils/converters'
import { isValidNonZeroNumber } from '../utils/predicate'
import transformer from './transformer'

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
