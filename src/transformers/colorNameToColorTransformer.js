import transformer from './transformer'
import { isNameValueWithName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'
import { nameOfNamedValue } from '../utils/parse'

const colorNameToColorTransformer = transformer(
  isNameValueWithName(`c`),
  (value, data, breakpointName) => {
    const colorName = nameOfNamedValue(value)
    return keyToObjectValueResolver(`color`)(colorName, data, breakpointName)
  }
)

export default colorNameToColorTransformer
