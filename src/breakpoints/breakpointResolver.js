import { ifElse, compose, both, head, tryCatch } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { lengthEq } from '../utils/list'
import { invalidBreakpointError, throwError } from '../errors'

const firstChildIsPlainObj = compose(isPlainObject, head)
const argIsObj = both(lengthEq(1), firstChildIsPlainObj)

const breakpointResolver = breakpointProvider => {
  const resolver = (...args) =>
    tryCatch(
      ifElse(
        argIsObj,
        compose(breakpointProvider.findBreakpointsByName, head),
        breakpointProvider.findBreakpointsByIndex
      ),
      () => throwError(invalidBreakpointError(args))
    )(args)

  return resolver
}
export default breakpointResolver
