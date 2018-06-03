import {
  T,
  always,
  compose,
  cond,
  has,
  head,
  pipe,
  prop,
  times,
  tryCatch,
} from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { SCOPE } from '../const/scope'
import { invalidBreakpointError, throwBreakpointError } from '../errors'

const argIsScopeObj = compose(has(SCOPE), head)
const argIsObj = compose(isPlainObject, head)

const expandScope = provider => value => times(always(value), provider.count())

const resolveBreakpointsImpl = provider => v =>
  cond([
    [
      argIsScopeObj,
      pipe(
        head,
        prop(SCOPE),
        expandScope(provider),
        resolveBreakpointsImpl(provider)
      ),
    ],
    [argIsObj, compose(provider.byName, head)],
    [T, provider.byIndex],
  ])(v)

const resolveBreakpoints = provider => (...args) =>
  tryCatch(resolveBreakpointsImpl(provider), message =>
    throwBreakpointError(invalidBreakpointError(message, args))
  )(args)

export default resolveBreakpoints
