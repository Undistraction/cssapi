import { when } from 'ramda'
import { isFraction } from '../utils/predicate'
import { ratioToPercentString } from '../utils/transformers'

const ratioToPercentageStringTransformer = when(
  isFraction,
  ratioToPercentString
)

export default ratioToPercentageStringTransformer
