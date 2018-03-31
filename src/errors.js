import { compose } from 'ramda'
import { appendFlipped } from 'ramda-adjunct'
import {
  joinWithComma,
  joinWithSpace,
  wrapWithSingleQuotes,
} from './utils/formatting'
import { ERROR_PREFIX, CONFIGURE_PREFIX } from './const'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const throwError = message => {
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

export const invalidBreakpointNameErrorMessage = (invalidName, validNames) =>
  `No breakpoint named ${wrapWithSingleQuotes(
    invalidName
  )} exists. Only ${validNames}`

export const invalidAPIParamsMessage = joinWithComma
