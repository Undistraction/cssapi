import { isFraction } from '../utils/predicate'
import { ratioToPercentString } from '../utils/converters'
import transformer from './transformer'

const ratioToPercentageStringTransformer = transformer(
  isFraction,
  ratioToPercentString
)

export default ratioToPercentageStringTransformer
