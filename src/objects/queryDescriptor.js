import { anyPass, isNil, reject } from 'ramda'
import { isZero } from '../utils/predicate'

const createQueryDescriptor = reject(anyPass([isNil, isZero]))

export default createQueryDescriptor
