import { ifElse, compose, both, head, tryCatch } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { lengthEq } from '../utils/list'
import { invalidBreakpointError, throwBreakpointError } from '../errors'

const firstChildIsPlainObj = compose(isPlainObject, head)
const argIsObj = both(lengthEq(1), firstChildIsPlainObj)

const resolve = ({ byName, byIndex }) =>
  ifElse(argIsObj, compose(byName, head), byIndex)

const resolveBreakpoints = provider => {
  const resolver = (...args) => {
    const r = tryCatch(resolve(provider), message =>
      throwBreakpointError(invalidBreakpointError(message, args))
    )(args)
    return r
  }

  return resolver
}
export default resolveBreakpoints
