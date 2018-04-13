import { map, when, pipe, curry, reduce } from 'ramda'
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
      ensureArray(transformers)
    )
)

export const decorateWithData = (predicateTransformers, data, breakpointName) =>
  map(([predicate, transformers]) => [
    predicate,
    value => transformValue(transformers, value, data, breakpointName),
  ])(predicateTransformers)
