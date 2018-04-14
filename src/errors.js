import { compose } from 'ramda'
import { appendFlipped } from 'ramda-adjunct'
import {
  joinWithSpace,
  printObj,
  wrapWithSingleQuotes,
} from './utils/formatting'
import { ERROR_PREFIX, BREAKPOINTS_PREFIX, DATA_PREFIX } from './const/errors'

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

export const noBreakpointAtIndexError = idx =>
  `Couldn't resolve breakpoint at index ${idx}`

export const noBreakpointWithNameError = name =>
  `Couldn't resolve breakpoint with name ${wrapWithSingleQuotes(name)}`

export const invalidBreakpointError = (message, args) =>
  `${message} with args: ${printObj(args)}`

export const missingDataNodeError = name =>
  `There is no data node defined named ${wrapWithSingleQuotes(name)}`

export const missingDataItemKeyError = (nodeName, keyName) =>
  `No item has been defined for data.${nodeName} named ${wrapWithSingleQuotes(
    keyName
  )}`

export const unrecognisedDataPrefixError = (prefix, validPrefixes) => {
  console.log(`VALID`, validPrefixes)
  return `Unrecognised prefix encountered: ${wrapWithSingleQuotes(
    prefix
  )}. Available prefixes are: ${printObj(validPrefixes)}`
}
