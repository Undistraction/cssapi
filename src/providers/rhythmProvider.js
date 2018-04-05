import dataLookupProvider from './dataLookupProvider'
import rhythmUnitsToLengthTransformer from '../transformers/rhythmUnitsToLengthTransformer'

const rhythmProvider = dataLookupProvider(rhythmUnitsToLengthTransformer)

export default rhythmProvider
