import { prop } from 'ramda'
import keyToObjectValueTransformer from '../transformers/keyToObjectValueTransformer'

const defaultProvider = (name, excludeRegExp) => (value, data) =>
  keyToObjectValueTransformer(excludeRegExp, prop(name, data))(value)

export default defaultProvider
