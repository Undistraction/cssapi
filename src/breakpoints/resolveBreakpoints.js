import { ifElse, compose, head, tryCatch } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { invalidBreakpointError, throwBreakpointError } from '../errors'

const isArgObj = compose(isPlainObject, head)

const resolveBreakpointsImpl = ({ byName, byIndex }) =>
  ifElse(isArgObj, compose(byName, head), byIndex)

const resolveBreakpoints = provider => (...args) =>
  tryCatch(resolveBreakpointsImpl(provider), message =>
    throwBreakpointError(invalidBreakpointError(message, args))
  )(args)

export default resolveBreakpoints
