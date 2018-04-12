import { compose } from 'ramda'
import { appendFlipped } from 'ramda-adjunct'
import {
  joinWithSpace,
  printObj,
  wrapWithSingleQuotes,
} from './utils/formatting'
import { ERROR_PREFIX, BREAKPOINTS_PREFIX, DATA_PREFIX } from './const'

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

export const throwDataError = throwPrefixedError(DATA_PREFIX)
export const throwBreakpointError = throwPrefixedError(BREAKPOINTS_PREFIX)

// -----------------------------------------------------------------------------
// Messages
// -----------------------------------------------------------------------------

export const invalidBreakpointError = args =>
  `Couldn't resolve breakpoint for args: ${printObj(args)}`

export const missingDataNodeError = name =>
  `There is no data node defined named ${wrapWithSingleQuotes(name)}`

export const missingDataItemKeyError = (nodeName, keyName) =>
  `No item has been defined for data.${nodeName} named ${wrapWithSingleQuotes(
    keyName
  )}`
