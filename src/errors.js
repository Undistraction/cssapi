import { compose, when } from 'ramda'
import { appendFlipped, isUndefined } from 'ramda-adjunct'
import {
  API_PREFIX,
  BREAKPOINTS_PREFIX,
  DATA_PREFIX,
  ERROR_PREFIX,
  MIXIN_PREFIX,
  MQ_PREFIX,
} from './const/errors'
import {
  joinWithSpace,
  printObj,
  wrapWithSingleQuotes,
} from './utils/formatting'

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
export const throwMQError = throwPrefixedError(MQ_PREFIX)
export const throwAPIError = throwPrefixedError(API_PREFIX)
export const throwMixinError = throwPrefixedError(MIXIN_PREFIX)

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

export const unsupportedBreakpointValuesError = declarations =>
  `When using the mq() helper you must supply only a single decaration value but you supplied: ${printObj(
    declarations
  )}`

export const invalidPropertyError = name =>
  `API doesn't support a property named ${wrapWithSingleQuotes(name)}`

export const noThemeObjectError = () =>
  `There was no theme object available on the props object`

export const noAPIOnThemeError = value =>
  `There was no api function defined on the theme object. Value was: ${printObj(
    value
  )}`
