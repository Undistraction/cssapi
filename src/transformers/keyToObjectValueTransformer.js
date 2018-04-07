import { path } from 'ramda'

const keyToObjectValueTransformer = dataPropName => (value, data) =>
  path([dataPropName, value], data)

export default keyToObjectValueTransformer
