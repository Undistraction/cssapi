import { when } from 'ramda'
import { isFraction } from '../utils/predicate'
import { ratioToPercentString } from '../utils/transformers'

const ratioToPercentageTransformer = when(isFraction, ratioToPercentString)

export default ratioToPercentageTransformer
