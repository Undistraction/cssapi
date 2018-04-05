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

const prepareForTransform = pipe(
  when(both(isNotString, isNotArray), toString),
  when(isNotArray, splitOnWhitespace)
)

export const transformValue = curry((transformers, value, data) =>
  compose(apply(compose), ensureArray)(transformers)(value, data)
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
