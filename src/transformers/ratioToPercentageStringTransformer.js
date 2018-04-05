import { when } from 'ramda'
import { isFraction } from '../utils/predicate'
import { ratioToPercentString } from '../utils/converters'

const ratioToPercentageStringTransformer = when(
  isFraction,
  ratioToPercentString
)

export default ratioToPercentageStringTransformer
