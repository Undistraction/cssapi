import { ifElse, compose, both, head, tryCatch } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { lengthEq } from '../utils/list'
import { invalidBreakpointError, throwBreakpointError } from '../errors'

const firstChildIsPlainObj = compose(isPlainObject, head)
const argIsObj = both(lengthEq(1), firstChildIsPlainObj)

const breakpointResolver = ({ byName, byIndex }) => {
  const resolver = (...args) =>
    tryCatch(ifElse(argIsObj, compose(byName, head), byIndex), () =>
      throwBreakpointError(invalidBreakpointError(args))
    )(args)

  return resolver
}
export default breakpointResolver
