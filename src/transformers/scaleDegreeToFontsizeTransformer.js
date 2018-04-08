import transformer from './transformer'
import { isNotFontSize } from '../utils/predicate'
import keyToObjectValueTransformer from './keyToObjectValueTransformer'

const scaleDegreeToFontSizeTransformer = (value, data) =>
  transformer(isNotFontSize, keyToObjectValueTransformer(`scale`))(value, data)

export default scaleDegreeToFontSizeTransformer
