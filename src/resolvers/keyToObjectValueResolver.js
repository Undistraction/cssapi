import { pipe, prop, when } from 'ramda'
import { isUndefined } from 'ramda-adjunct'
import keyToValueResolver from '../resolvers/keyToValueResolver'
import { throwDataError, missingDataItemKeyError } from '../errors'

const keyToObjectValueResolver = dataPropName => (
  value,
  data,
  breakpointName
) =>
  pipe(
    keyToValueResolver(dataPropName),
    prop(value),
    when(isUndefined, () =>
      throwDataError(missingDataItemKeyError(dataPropName, value))
    )
  )(value, data, breakpointName)

export default keyToObjectValueResolver
