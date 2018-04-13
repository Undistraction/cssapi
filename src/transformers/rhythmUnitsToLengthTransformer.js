import { isRhythmUnit } from '../utils/predicate'
import transformer from './transformer'
import { mulitplyUnitlessNumbersToDistance } from '../utils/converters'
import keyToValueResolver from '../resolvers/keyToValueResolver'

const rhythmUnitsToRemsTransformer = transformer(
  isRhythmUnit,
  (value, data, breakpointName) => {
    const rhythm = keyToValueResolver(`rhythm`)(value, data, breakpointName)
    const unit = keyToValueResolver(`unit`)(value, data, breakpointName)
    const baseFontSize = keyToValueResolver(`baseFontSize`)(
      value,
      data,
      breakpointName
    )
    return mulitplyUnitlessNumbersToDistance(rhythm, unit, baseFontSize)(value)
  }
)

export default rhythmUnitsToRemsTransformer
