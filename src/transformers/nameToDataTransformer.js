import { prepend } from 'ramda'
import transformer from './transformer'
import { isNameValueWithName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'
import { nameOfNamedValue } from '../utils/parse'

const nameToDataTransformer = name => aliases =>
  transformer(
    isNameValueWithName(prepend(name, aliases)),
    (value, data, breakpointName) => {
      const colorName = nameOfNamedValue(value)
      return keyToObjectValueResolver(name)(colorName, data, breakpointName)
    }
  )

export default nameToDataTransformer
