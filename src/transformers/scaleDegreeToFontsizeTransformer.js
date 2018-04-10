import transformer from './transformer'
import { isNotFontSize } from '../utils/predicate'
import keyToObjectValueTransformer from './keyToObjectValueTransformer'

const scaleDegreeToFontSizeTransformer = (value, data, breakpointName) =>
  transformer(isNotFontSize, keyToObjectValueTransformer(`scale`))(
    value,
    data,
    breakpointName
  )

export default scaleDegreeToFontSizeTransformer
