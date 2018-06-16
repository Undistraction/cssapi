import {
  curry,
  flatten,
  ifElse,
  map,
  match,
  pipe,
  reduce,
  replace,
  trim,
  when,
  __,
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

const transformArgumentParts = transform =>
  map(
    pipe(
      trim,
      splitOnWhitespace,
      map(pipe(ensureArray, transform)),
      joinWithSpace
    )
  )

const transformFunctionArguments = transform =>
  pipe(
    splitOnUnnestedComma,
    transformArgumentParts(transform),
    joinWithCommaSpace
  )

export const prepareForTransform = pipe(
  when(isNotStringOrArray, String),
  when(isString, splitOnUnnestedWhitespace)
)

export const transformValue = curry(
  (transformers, value, data, breakpointName) =>
    reduce(
      (currentValue, transformer) =>
        transformer(currentValue, data, breakpointName),
      value,
      pipe(ensureArray, flatten)(transformers)
    )
)

export const transformValues = (transformers, values, data, breakpointName) =>
  map(
    value => transformValue(transformers, value, data, breakpointName),
    values
  )

export const decorateWithData = (predicateTransformers, data, breakpointName) =>
  map(([predicate, transformers]) => [
    predicate,
    value => transformValue(transformers, value, data, breakpointName),
  ])(predicateTransformers)

export const transformFunctionElements = transform => value => {
  const typeOfFunction = match(RE_CSS_FUNCTION_NAME, value)[1]
  return pipe(
    trim,
    extractFunctionArguments,
    transformFunctionArguments(transform),
    createCSSFunctionFromTemplate(typeOfFunction)
  )(value)
}

export const transformCalcElements = transform =>
  pipe(
    trim,
    extractFunctionArguments,
    replace(RE_CALC_VALUES, transform),
    createCSSFunctionFromTemplate(`calc`)
  )

export const transformGroupMember = (transformers, data, breakpointName) =>
  pipe(
    splitOnUnnestedWhitespace,
    transformValues(transformers, __, data, breakpointName),
    joinWithSpace
  )

const transformGroupMembers = pipe(transformGroupMember, map)

export const transformGroup = (transformers, data, breakpointName) =>
  pipe(
    splitOnUnnestedComma,
    trimAll,
    transformGroupMembers(transformers, data, breakpointName),
    joinWithCommaSpace
  )

export const transformDeclaration = (transformers, breakpointName, data) =>
  ifElse(
    isGroupString,
    transformGroup(transformers, data, breakpointName),
    transformValue(transformers, __, data, breakpointName)
  )
