import { when } from 'ramda'
import { isPercentString } from '../utils/predicate'
import { percentageStringToRatio } from '../utils/transformers'

const percentageStringToRatioTransformer = when(
  isPercentString,
  percentageStringToRatio
)

export default percentageStringToRatioTransformer
