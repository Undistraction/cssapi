import { anyPass, isNil, reject } from 'ramda'
import { isZero } from '../utils/predicate'

const createQueryDescriptor = o => {
  const r = reject(anyPass([isNil, isZero]), o)
  console.log(o, r)
  return r
}

export default createQueryDescriptor
