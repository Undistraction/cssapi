import transformer from './transformer'
import { isNotFontSize } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'

const scaleDegreeToFontSizeTransformer = (value, data, breakpointName) =>
  transformer(isNotFontSize, keyToObjectValueResolver(`scale`))(
    value,
    data,
    breakpointName
  )

export default scaleDegreeToFontSizeTransformer
