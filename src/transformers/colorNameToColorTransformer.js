import transformer from './transformer'
import { isColorName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'
import { nameOfNamedValue } from '../utils/parse'

const colorNameToColorTransformer = transformer(
  isColorName,
  (value, data, breakpointName) => {
    const colorName = nameOfNamedValue(value)
    return keyToObjectValueResolver(`color`)(colorName, data, breakpointName)
  }
)

export default colorNameToColorTransformer
