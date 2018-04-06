import dataLookupProvider from '../providers/dataLookupProvider'
import rhythmUnitsToLengthTransformer from '../transformers/rhythmUnitsToLengthTransformer'

const rhythmUnitsToRemsTransformer = dataLookupProvider(
  rhythmUnitsToLengthTransformer
)(`rhythm`)

export default rhythmUnitsToRemsTransformer
