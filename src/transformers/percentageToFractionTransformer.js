import { when } from 'ramda'
import { isPercentString } from '../utils/predicate'
import { percentageStringToRatio } from '../utils/transformers'

const percentageToFractionTransformer = when(
  isPercentString,
  percentageStringToRatio
)

export default percentageToFractionTransformer
