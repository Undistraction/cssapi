import { converge, equals, identity, pipe, prepend } from 'ramda'
import { filterKeys } from '../utils/objects'

const aliasesForNodeName = aliases => name => filterKeys(equals(name))(aliases)

// eslint-disable-next-line import/prefer-default-export
export const nameAndAliasesForNodeName = (aliases, name) =>
  pipe(converge(prepend, [identity, aliasesForNodeName(aliases)]))(name)
