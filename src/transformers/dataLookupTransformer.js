import { equals, prepend, when } from 'ramda'
import keyToObjectValueResolver from '../resolvers/keyToObjectValueResolver'
import { filterKeys } from '../utils/objects'
import { nameOfNamedValue } from '../utils/parse'
import { isTokenWithName } from '../utils/predicate'

const dataLookupTransformer = dataNodeName => (value, data, breakpointName) => {
  const aliases = filterKeys(equals(dataNodeName), data.aliases)
  return when(isTokenWithName(prepend(dataNodeName, aliases)), () => {
    const name = nameOfNamedValue(value)
    return keyToObjectValueResolver(dataNodeName)(name, data, breakpointName)
  })(value)
}

export default dataLookupTransformer
