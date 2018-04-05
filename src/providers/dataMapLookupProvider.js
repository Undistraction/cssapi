import keyToObjectValueTransformer from '../transformers/keyToObjectValueTransformer'
import dataLookupProvider from './dataLookupProvider'

const dataMapLookupProvider = dataLookupProvider(keyToObjectValueTransformer)

export default dataMapLookupProvider
