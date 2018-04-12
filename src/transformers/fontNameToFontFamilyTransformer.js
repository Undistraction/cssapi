import transformer from './transformer'
import { isNotGenericFontName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'

const fontNameToFontFamilyTransformer = transformer(
  isNotGenericFontName,
  keyToObjectValueResolver(`font`)
)

export default fontNameToFontFamilyTransformer
