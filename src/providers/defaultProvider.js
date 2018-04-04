import { prop } from 'ramda'
import keyToObjectValueTransformer from '../transformers/keyToObjectValueTransformer'

const defaultProvider = (name, config) => (value, data) =>
  keyToObjectValueTransformer(config, prop(name, data))(value)

export default defaultProvider
