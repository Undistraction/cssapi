import { pipe, prop, when } from 'ramda'
import { isUndefined } from 'ramda-adjunct'
import keyToValueResolver from '../resolvers/keyToValueResolver'
import { throwDataError, missingDataError } from '../errors'

const keyToObjectValueResolver = dataPropName => (
  value,
  data,
  breakpointName
) =>
  pipe(
    keyToValueResolver(dataPropName),
    prop(value),
    when(isUndefined, () => throwDataError(missingDataError(dataPropName)))
  )(value, data, breakpointName)

export default keyToObjectValueResolver
