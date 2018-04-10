import { pipe, prop } from 'ramda'
import keyToValueTransformer from './keyToValueTransformer'

const keyToObjectValueTransformer = dataPropName => (
  value,
  data,
  breakpointName
) =>
  pipe(keyToValueTransformer(dataPropName), prop(value))(
    value,
    data,
    breakpointName
  )

export default keyToObjectValueTransformer
