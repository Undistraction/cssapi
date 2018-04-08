import {
  map,
  identity,
  toString,
  when,
  useWith,
  pipe,
  curry,
  reduce,
} from 'ramda'
import { isNotArray, ensureArray } from 'ramda-adjunct'

import { splitOnWhitespace } from './formatting'
import { condDefault } from './functions'
import { isNotStringOrArray } from './predicate'

const prepareForTransform = pipe(
  when(isNotStringOrArray, toString),
  when(isNotArray, splitOnWhitespace)
)

export const transformValue = curry((transformers, value, data) =>
  reduce(
    (currentValue, transformer) => transformer(currentValue, data),
    value,
    ensureArray(transformers)
  )
)

const decorateWithData = (data, predicateTransformers) =>
  map(([predicate, transformers]) => [
    predicate,
    value => transformValue(transformers, value, data),
  ])(predicateTransformers)

const transformByType = predicateTransformers => (value, data) => {
  predicateTransformers = decorateWithData(data, predicateTransformers)
  return map(condDefault(predicateTransformers))(value)
}

export const transformMatchingParts = predicateTransformers => (value, data) =>
  useWith(transformByType(predicateTransformers), [
    prepareForTransform,
    identity,
  ])(value, data)

export const transformAllPartsWith = transformers => (value, data) =>
  pipe(
    prepareForTransform,
    map(valuePart => transformValue(transformers, valuePart, data))
  )(value)
