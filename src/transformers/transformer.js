import { when } from 'ramda'

const transformer = (predicate, convert) => (value, data) =>
  when(predicate, () => convert(value, data))(value)

export default transformer
