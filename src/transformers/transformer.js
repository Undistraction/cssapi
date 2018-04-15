import { when } from 'ramda'
import { transformValue } from '../utils/transformers'

const transformer = (predicate, transformers) => (
  value,
  data,
  breakpointName
) =>
  when(predicate, () =>
    transformValue(transformers, value, data, breakpointName)
  )(value)

export default transformer
