import { when } from 'ramda'

const transformer = (predicate, convert) => (value, data, breakpointName) =>
  when(predicate, () => convert(value, data, breakpointName))(value)
export default transformer
