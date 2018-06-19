import { map } from 'ramda'
import resolveKeyToValue from './resolveKeyToValue'

const resolveKeysToValues = keys => (value, data, breakpointName) =>
  map(key => resolveKeyToValue(key)(value, data, breakpointName), keys)

export default resolveKeysToValues
