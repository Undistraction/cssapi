import transformer from './transformer'
import { isNotGenericFontName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'
import { nameOfNamedValue } from '../utils/parse'

const fontNameToFontFamilyTransformer = transformer(
  isNotGenericFontName,
  (value, data, breakpointName) => {
    const fontName = nameOfNamedValue(value)
    return keyToObjectValueResolver(`font`)(fontName, data, breakpointName)
  }
)

export default fontNameToFontFamilyTransformer
