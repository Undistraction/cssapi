import {
  map,
  identity,
  toString,
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
  when(isNotStringOrArray, toString),
  when(isNotArray, splitOnWhitespace)
)

export const transformValue = curry((transformers, value, data) => {
  const r = reduce(
    (currentValue, transformer) => transformer(currentValue, data),
    value,
    ensureArray(transformers)
  )
  return r
})

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

const transformByType = (partToPredicateMap, partToTransformerMap) => (
  value,
  data
) => {
  let predicateTransformers = mapPredicatesToTransformers(
    partToPredicateMap,
    partToTransformerMap
  )
  predicateTransformers = decorateWithData(data, predicateTransformers)
  return map(condDefault(predicateTransformers))(value)
}

export const transformMatchingParts = partToPredicateMap => partToTransformerMap => (
  value,
  data
) =>
  useWith(transformByType(partToPredicateMap, partToTransformerMap), [
    prepareForTransform,
    identity,
  ])(value, data)

export const transformAllPartsWith = transformers => (value, data) =>
  pipe(
    prepareForTransform,
    map(valuePart => transformValue(transformers, valuePart, data))
  )(value)
