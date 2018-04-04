import { prop } from 'ramda'
import keyToObjectValueTransformer from '../transformers/keyToObjectValueTransformer'

const defaultProvider = (name, excludeRegExp) => data =>
  keyToObjectValueTransformer(excludeRegExp, prop(name, data))

export default defaultProvider
