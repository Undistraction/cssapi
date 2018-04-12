import { ifElse, compose, both, head, tryCatch } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { lengthEq } from '../utils/list'
import { invalidBreakpointError, throwBreakpointError } from '../errors'

const firstChildIsPlainObj = compose(isPlainObject, head)
const argIsObj = both(lengthEq(1), firstChildIsPlainObj)

const resolve = ({ byName, byIndex }) => v => {
  console.log(`>`, v)
  return ifElse(argIsObj, compose(byName, head), byIndex)(v)
}

const resolveBreakpoints = provider => {
  const resolver = (...args) =>
    tryCatch(resolve(provider), () =>
      throwBreakpointError(invalidBreakpointError(args))
    )(args)

  return resolver
}
export default resolveBreakpoints
