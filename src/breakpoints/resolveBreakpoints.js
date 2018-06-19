import { always, compose, cond, head, pipe, T, times, tryCatch } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { invalidBreakpointError, throwBreakpointError } from '../errors'
import { hasScope, propScope } from '../objects/scope'

const argIsScopeObj = compose(hasScope, head)

const argIsObj = compose(isPlainObject, head)

const expandScope = provider => value => times(always(value), provider.count())

const resolveBreakpointsImpl = provider => breakpoint =>
  cond([
    [
      argIsScopeObj,
      pipe(
        head,
        propScope,
        expandScope(provider),
        resolveBreakpointsImpl(provider)
        // run through and remove values that don't change.
      ),
    ],
    [argIsObj, compose(provider.byName, head)],
    [T, provider.byIndex],
  ])(breakpoint)

const resolveBreakpoints = provider => (...args) =>
  tryCatch(resolveBreakpointsImpl(provider), message =>
    throwBreakpointError(invalidBreakpointError(message, args))
  )(args)

export default resolveBreakpoints
