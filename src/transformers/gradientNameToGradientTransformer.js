import transformer from './transformer'
import { isColorName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'
import { nameOfNamedValue } from '../utils/parse'

const colorNameToColorTransformer = transformer(
  isColorName,
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
