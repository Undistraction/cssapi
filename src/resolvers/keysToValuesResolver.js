import { map } from 'ramda'
import keyToValueResolver from './keyToValueResolver'

const keysToValuesResolver = keys => (value, data, breakpointName) =>
  map(key => keyToValueResolver(key)(value, data, breakpointName), keys)

export default keysToValuesResolver
