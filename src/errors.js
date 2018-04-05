import { compose } from 'ramda'
import { appendFlipped } from 'ramda-adjunct'
import { joinWithSpace, printObj } from './utils/formatting'
import { ERROR_PREFIX, CONFIGURE_PREFIX } from './const'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const throwError = message => {
  throw new Error(joinWithSpace([ERROR_PREFIX, message]))
}

const throwPrefixedError = prefix =>
  compose(throwError, joinWithSpace, appendFlipped([prefix]))

// -----------------------------------------------------------------------------
// Prefixed Errors
// -----------------------------------------------------------------------------

export const throwConfigureError = throwPrefixedError(CONFIGURE_PREFIX)

// -----------------------------------------------------------------------------
// Messages
// -----------------------------------------------------------------------------

export const invalidBreakpointError = args =>
  `Couldn't resolve breakpoint for args: ${printObj(args)}`
