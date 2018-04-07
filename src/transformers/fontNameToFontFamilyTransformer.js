import transformer from './transformer'
import { isNotGenericFontFamily } from '../utils/predicate'
import keyToObjectValueTransformer from './keyToObjectValueTransformer'

const colorNameToColorValueTransformer = transformer(
  isNotGenericFontFamily,
  keyToObjectValueTransformer(`font`)
)

export default colorNameToColorValueTransformer
