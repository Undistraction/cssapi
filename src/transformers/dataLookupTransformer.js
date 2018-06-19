import { when } from 'ramda'
import resolveKeyToObjectValue from '../resolvers/resolveKeyToObjectValue'
import { nameAndAliasesForNodeName } from '../utils/data'
import { tokenName } from '../utils/parse'
import { tokenMatches } from '../utils/predicate'

// Lookup the value of an object, for example `color.primary`
const dataLookupTransformer = nodeName => (value, data, breakpointName) => {
  const nameAndAliases = nameAndAliasesForNodeName(data.aliases, nodeName)

  return when(tokenMatches(nameAndAliases), () => {
    const name = tokenName(value)
    return resolveKeyToObjectValue(nodeName)(name, data, breakpointName)
  })(value)
}

export default dataLookupTransformer
