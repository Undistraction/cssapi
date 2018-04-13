import { isRhythmUnit } from '../utils/predicate'
import transformer from './transformer'
import { mulitplyUnitlessNumbersToDistance } from '../utils/converters'
import keysToValuesResolver from '../resolvers/keysToValuesResolver'

const rhythmUnitsToRemsTransformer = transformer(
  isRhythmUnit,
  (value, data, breakpointName) => {
    const [rhythm, lengthUnit, baseFontSize] = keysToValuesResolver([
      `rhythm`,
      `lengthUnit`,
      `baseFontSize`,
    ])(value, data, breakpointName)

    return mulitplyUnitlessNumbersToDistance(rhythm, lengthUnit, baseFontSize)(
      value
    )
  }
)

export default rhythmUnitsToRemsTransformer
