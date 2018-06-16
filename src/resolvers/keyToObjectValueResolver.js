import { pipe, prop } from 'ramda'
import { missingDataItemKeyError, throwDataError } from '../errors'
import keyToValueResolver from '../resolvers/keyToValueResolver'
import { whenIsUndefined } from '../utils/logic'

const keyToObjectValueResolver = dataPropName => (
  value,
  data,
  breakpointName
) =>
  pipe(
    keyToValueResolver(dataPropName),
    prop(value),
    whenIsUndefined(() =>
      throwDataError(missingDataItemKeyError(dataPropName, value))
    )
  )(value, data, breakpointName)

export default keyToObjectValueResolver
