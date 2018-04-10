import transformer from './transformer'
import { isNotColor } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'

const colorNameToColorValueTransformer = transformer(
  isNotColor,
  keyToObjectValueResolver(`color`)
)

export default colorNameToColorValueTransformer
