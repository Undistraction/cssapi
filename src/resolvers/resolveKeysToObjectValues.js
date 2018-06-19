import { map } from 'ramda'
import resolveKeyToObjectValue from './resolveKeyToObjectValue'

const resolveKeysToValues = (name, keys) => (data, breakpointName) =>
  map(key => resolveKeyToObjectValue(name)(key, data, breakpointName), keys)

export default resolveKeysToValues
