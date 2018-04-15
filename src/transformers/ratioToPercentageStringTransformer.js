import { isValidPositiveNumber } from '../utils/predicate'
import { ratioToPercentString } from '../utils/converters'
import transformer from './transformer'

const ratioToPercentageStringTransformer = transformer(
  isValidPositiveNumber,
  ratioToPercentString
)

export default ratioToPercentageStringTransformer
