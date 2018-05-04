import { curry, flatten, map, match, pipe, reduce, trim, when } from 'ramda'
import { ensureArray, isString } from 'ramda-adjunct'
import { RE_CSS_FUNCTION_NAME } from '../const/regexp'
import {
  extractFunctionArguments,
  joinWithCommaSpace,
  joinWithSpace,
  splitOnUnnestedComma,
  splitOnUnnestedWhitespace,
  splitOnWhitespace,
} from './formatting'
import { isNotStringOrArray } from './predicate'
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
    v => createCSSFunctionFromTemplate({ typeOfFunction, value: v })
  )(value)
}
