import resolveKeysToValues from '../resolvers/resolveKeysToValues'
import { mulitplyUnitlessNumbersToDistance } from '../utils/converters'
import { isRhythmUnit } from '../utils/predicate'
import transformer from './transformer'

const rhythmUnitsToRemsTransformer = transformer(
  isRhythmUnit,
  (value, data, breakpointName) => {
    const [rhythm, lengthUnit, baseFontSize] = resolveKeysToValues([
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
