import {
  adjust,
  curry,
  flatten,
  ifElse,
  map,
  match,
  nth,
  pipe,
  reduce,
  replace,
  trim,
  when,
} from 'ramda'
import { ensureArray, isString } from 'ramda-adjunct'
import { RE_CALC_VALUES, RE_CSS_FUNCTION_NAME } from '../const/regexp'
import {
  extractFunctionArguments,
  joinWithCommaSpace,
  joinWithSpace,
  splitOnUnnestedComma,
  splitOnUnnestedWhitespace,
  splitOnWhitespace,
  trimAll,
} from './formatting'
import { isGroupString, isNotStringOrArray } from './predicate'
import { createCSSFunctionFromTemplate } from './templates'

export const prepareForTransform = pipe(
  when(isNotStringOrArray, String),
  when(isString, splitOnUnnestedWhitespace)
)

// -----------------------------------------------------------------------------
// CSS Function name()
// -----------------------------------------------------------------------------

const transformArgumentPart = transformers =>
  pipe(
    trim,
    splitOnWhitespace,
    map(pipe(ensureArray, transformers)),
    joinWithSpace
  )

const transformArgumentParts = transformers =>
  map(transformArgumentPart(transformers))

const transformFunctionArguments = transformers =>
  pipe(
    splitOnUnnestedComma,
    transformArgumentParts(transformers),
    joinWithCommaSpace
  )

const typeOfFunction = pipe(match(RE_CSS_FUNCTION_NAME), nth(1))

export const transformFunctionElements = curry((transformers, value) =>
  pipe(
    trim,
    extractFunctionArguments,
    transformFunctionArguments(transformers),
    createCSSFunctionFromTemplate(typeOfFunction(value))
  )(value)
)

export const transformCalcElements = transformers =>
  pipe(
    trim,
    extractFunctionArguments,
    replace(RE_CALC_VALUES, transformers),
    createCSSFunctionFromTemplate(`calc`)
  )

// -----------------------------------------------------------------------------
// Transform Basic Value - after we have parsed to smallest possible value
// -----------------------------------------------------------------------------

const prepareTransformers = pipe(ensureArray, flatten)

const applyTransformers = (value, data, breakpointName) =>
  reduce(
    (currentValue, transformer) =>
      transformer(currentValue, data, breakpointName),
    value
  )

export const transformValue = curry(
  (transformers, data, breakpointName, value) =>
    pipe(prepareTransformers, applyTransformers(value, data, breakpointName))(
      transformers
    )
)

export const transformValues = curry(
  (transformers, data, breakpointName, values) =>
    pipe(
      prepareForTransform,
      map(transformValue(transformers, data, breakpointName))
    )(values)
)

export const transformValueAt = curry(
  (transformers, data, breakpointName, position, value) =>
    pipe(
      prepareForTransform,
      adjust(transformValues(transformers, data, breakpointName), position)
    )(value)
)

// -----------------------------------------------------------------------------
// Transform Group (values, separated, with, comma)
// -----------------------------------------------------------------------------

const transformGroupMember = (transformers, data, breakpointName) =>
  pipe(
    splitOnUnnestedWhitespace,
    transformValues(transformers, data, breakpointName),
    joinWithSpace
  )

const transformGroupMembers = (transformers, data, breakpointName) =>
  map(transformGroupMember(transformers, data, breakpointName))

export const transformGroup = (transformers, data, breakpointName) =>
  pipe(
    splitOnUnnestedComma,
    trimAll,
    transformGroupMembers(transformers, data, breakpointName),
    joinWithCommaSpace
  )

export const transformDeclarationValue = (transformers, breakpointName, data) =>
  ifElse(
    isGroupString,
    transformGroup(transformers, data, breakpointName),
    transformValue(transformers, data, breakpointName)
  )
