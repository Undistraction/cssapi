import transformer from './transformer'
import { isNotGenericFontName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'

const colorNameToColorValueTransformer = transformer(
  isNotGenericFontName,
  keyToObjectValueResolver(`font`)
)

export default colorNameToColorValueTransformer
