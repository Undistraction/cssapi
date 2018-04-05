import {
  compose,
  map,
  identity,
  toString,
  when,
  both,
  useWith,
  pipe,
  apply,
  curry,
} from 'ramda'
import { isNotString, isNotArray, ensureArray } from 'ramda-adjunct'

import { splitOnWhitespace } from './formatting'
import { condDefault } from './functions'

const prepareValue = pipe(
  when(both(isNotString, isNotArray), toString),
  when(isNotArray, splitOnWhitespace)
)

const decorateWithData = (data, predicateTransformers) =>
  map(([predicate, transformer]) => [
    predicate,
    value => transformer(value, data),
  ])(predicateTransformers)

const mapAndDetectToTransformerOrIdentity = predicateTransformers => (
  value,
  data
) => {
  predicateTransformers = decorateWithData(data, predicateTransformers)
  return map(condDefault(predicateTransformers))(value)
}

export const transformMatchingParts = predicateTransformers => (value, data) =>
  useWith(mapAndDetectToTransformerOrIdentity(predicateTransformers), [
    prepareValue,
    identity,
  ])(value, data)

export const transformValue = curry((transformers, value, data) =>
  compose(apply(compose), ensureArray)(transformers)(value, data)
)

export const transformAllPartsWith = transformers => (value, data) =>
  pipe(
    prepareValue,
    map(valuePart => transformValue(transformers, valuePart, data))
  )(value)
