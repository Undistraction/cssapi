import { map } from 'ramda'
import keyToObjectValueResolver from './keyToObjectValueResolver'

const keysToValuesResolver = (name, keys) => (data, breakpointName) =>
  map(key => keyToObjectValueResolver(name)(key, data, breakpointName), keys)

export default keysToValuesResolver
