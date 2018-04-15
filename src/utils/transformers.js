import { map, when, pipe, curry, reduce, flatten } from 'ramda'
import { ensureArray, isString } from 'ramda-adjunct'

import { splitOnUnnestedWhitespace } from './formatting'
import { isNotStringOrArray } from './predicate'

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
