import { pipe } from 'ramda'
import { transformValues } from '../../utils/transformers'

const transformPartsWith = transformers => (value, data, breakpointName) =>
  pipe(transformValues(transformers, data, breakpointName))(value)

export default transformPartsWith
