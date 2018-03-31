import { when, both, flip, lte, allPass } from 'ramda'
import { isValidNumber, isNonNegative } from 'ramda-adjunct'
import { isNotZero } from '../utils/predicate'

const isValidNonNegativeNumber = both(isValidNumber, isNonNegative)
const isLessThan4 = flip(lte)(4)
const isFraction = allPass([isValidNonNegativeNumber, isLessThan4, isNotZero])

const toOutputUnit = v => `${100 * v}%`

const fractionToPercentageTransformer = when(isFraction, toOutputUnit)

export default fractionToPercentageTransformer
