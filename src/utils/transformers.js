import {
  trim,
  nth,
  match,
  map,
  when,
  pipe,
  curry,
  reduce,
  flatten,
} from 'ramda'
import { ensureArray, isString } from 'ramda-adjunct'
import { isNotStringOrArray } from './predicate'
import {
  splitOnUnnestedWhitespace,
  joinWithCommaSpace,
  splitOnUnnestedComma,
  extractArguments,
} from './formatting'
import { RE_CSS_FUNCTION_NAME } from '../const/regexp'
import { createCSSFunctionFromTemplate } from './templates'

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
    extractArguments,
    nth(1),
    splitOnUnnestedComma,
    map(trim),
    transform,
    joinWithCommaSpace,
    v => createCSSFunctionFromTemplate({ typeOfFunction, value: v })
  )(value)
}
