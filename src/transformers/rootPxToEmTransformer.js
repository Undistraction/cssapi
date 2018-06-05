import { __ } from 'ramda'
import { transformValue } from '../utils/transformers'
import lengthToEmsTransformer from './lengthToEmsTransformer'

// the base font size will always be 16 for media queries
const rootPxToEmTransformer = transformValue(
  lengthToEmsTransformer,
  __,
  { baseFontSize: 16 },
  null
)

export default rootPxToEmTransformer
