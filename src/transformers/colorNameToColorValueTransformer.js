import transformer from './transformer'
import { isNotColor } from '../utils/predicate'
import keyToObjectValueTransformer from './keyToObjectValueTransformer'

const colorNameToColorValueTransformer = transformer(
  isNotColor,
  keyToObjectValueTransformer(`color`)
)

export default colorNameToColorValueTransformer
