import { isPercentString } from '../utils/predicate'
import { percentageStringToRatio } from '../utils/converters'
import transformer from './transformer'

const percentageStringToRatioTransformer = transformer(
  isPercentString,
  percentageStringToRatio
)

export default percentageStringToRatioTransformer
