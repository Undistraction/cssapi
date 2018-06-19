import { pipe, prop } from 'ramda'
import { missingDataItemKeyError, throwDataError } from '../errors'
import resolveKeyToValue from '../resolvers/resolveKeyToValue'
import { whenIsUndefined } from '../utils/logic'

const resolveKeyToObjectValue = dataPropName => (
  propName,
  data,
  breakpointName
) =>
  pipe(
    resolveKeyToValue(dataPropName),
    prop(propName),
    whenIsUndefined(() =>
      throwDataError(missingDataItemKeyError(dataPropName, propName))
    )
  )(propName, data, breakpointName)

export default resolveKeyToObjectValue
