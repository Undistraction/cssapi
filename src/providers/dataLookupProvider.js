import { prop } from 'ramda'

const dataLookupProvider = resolver => (name, config) => (value, data) =>
  resolver(prop(name, data), config)(value)

export default dataLookupProvider
