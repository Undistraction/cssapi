import { pipe, prop } from 'ramda'
import keyToValueResolver from '../resolvers/keyToValueResolver'

const keyToObjectValueResolver = dataPropName => (
  value,
  data,
  breakpointName
) =>
  pipe(keyToValueResolver(dataPropName), prop(value))(
    value,
    data,
    breakpointName
  )

export default keyToObjectValueResolver
