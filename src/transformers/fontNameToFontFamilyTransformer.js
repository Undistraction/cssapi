import transformer from './transformer'
import { isNotGenericFontName } from '../utils/predicate'
import keyToObjectValueTransformer from './keyToObjectValueTransformer'

const colorNameToColorValueTransformer = transformer(
  isNotGenericFontName,
  keyToObjectValueTransformer(`font`)
)

export default colorNameToColorValueTransformer
