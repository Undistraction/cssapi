import transformer from './transformer'
import { isNameValueWithName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'
import { nameOfNamedValue } from '../utils/parse'

const colorNameToColorTransformer = transformer(
  isNameValueWithName(`g`),
  (value, data, breakpointName) => {
    const gradientName = nameOfNamedValue(value)
    return keyToObjectValueResolver(`gradient`)(
      gradientName,
      data,
      breakpointName
    )
  }
)

export default colorNameToColorTransformer
