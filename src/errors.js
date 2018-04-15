import { compose, when } from 'ramda'
import { appendFlipped, isUndefined } from 'ramda-adjunct'
import {
  joinWithSpace,
  printObj,
  wrapWithSingleQuotes,
} from './utils/formatting'
import { ERROR_PREFIX, BREAKPOINTS_PREFIX, DATA_PREFIX } from './const/errors'

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const throwLibError = message => {
  throw new Error(joinWithSpace([ERROR_PREFIX, message]))
}

const throwPrefixedError = prefix =>
  compose(throwLibError, joinWithSpace, appendFlipped([prefix]))

export const throwWhenUndefined = error =>
  when(isUndefined, () => {
    throw error
  })

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

export const unrecognisedDataPrefixError = (prefix, validPrefixes) =>
  `Unrecognised prefix encountered: ${wrapWithSingleQuotes(
    prefix
  )}. Available prefixes are: ${printObj(validPrefixes)}`
