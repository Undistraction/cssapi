import {
  map,
  identity,
  when,
  useWith,
  pipe,
  curry,
  reduce,
  append,
} from 'ramda'
import {
  isNotArray,
  ensureArray,
  stubArray,
  isNotUndefined,
} from 'ramda-adjunct'

import { splitOnWhitespace } from './formatting'
import { condDefault } from './functions'
import { isNotStringOrArray } from './predicate'
import { reduceObjIndexed } from './objects'

const prepareForTransform = pipe(
  when(isNotStringOrArray, String),
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

const mapPredicatesToTransformers = (
  partToPredicateMap,
  partToTransformerMap
) =>
  reduceObjIndexed(
    (acc, [partName, transformer]) =>
      isNotUndefined(partToPredicateMap[partName])
        ? append([partToPredicateMap[partName], transformer], acc)
        : acc,
    stubArray(),
    partToTransformerMap
  )

const transformPartsIfPredicatesMatch = predicateTransformers => (
  value,
  data
) => {
  predicateTransformers = decorateWithData(data, predicateTransformers)
  return map(condDefault(predicateTransformers))(value)
}

const prepareTransformers = pipe(
  mapPredicatesToTransformers,
  transformPartsIfPredicatesMatch
)

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const transformMatchingParts = partToPredicateMap => partToTransformerMap => (
  value,
  data
) =>
  useWith(prepareTransformers(partToPredicateMap, partToTransformerMap), [
    prepareForTransform,
    identity,
  ])(value, data)

export const transformAllParts = transformers => (value, data) =>
  pipe(
    prepareForTransform,
    map(valuePart => transformValue(transformers, valuePart, data))
  )(value)
