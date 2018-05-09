import rhythmUnitsToLengthTransformer from '../transformers/rhythmUnitsToLengthTransformer'
import calcTransformer from './calcTransformer'
import unitlessNumberToLengthTransformer from './unitlessNumberToLengthTransformer'

const lengthTransformersWithoutCalc = [
  unitlessNumberToLengthTransformer,
  rhythmUnitsToLengthTransformer,
]

const lengthTransformers = [
  // eslint-disable-next-line no-use-before-define
  calcTransformer(lengthTransformersWithoutCalc),
  ...lengthTransformersWithoutCalc,
]

export default lengthTransformers
