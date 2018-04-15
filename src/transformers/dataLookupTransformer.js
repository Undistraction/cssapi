import { prepend, when } from 'ramda'
import { isNameValueWithName } from '../utils/predicate'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'
import { nameOfNamedValue } from '../utils/parse'
import { filterKeys } from '../utils/objects'

const dataLookupTransformer = dataNodeName => (value, data, breakpointName) => {
  const aliases = filterKeys(data.aliases)
  return when(isNameValueWithName(prepend(dataNodeName, aliases)), () => {
    const name = nameOfNamedValue(value)
    return keyToObjectValueResolver(dataNodeName)(name, data, breakpointName)
  })(value)
}

export default dataLookupTransformer
