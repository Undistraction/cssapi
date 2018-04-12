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
import { isNotArray, ensureArray, isNotUndefined } from 'ramda-adjunct'

import { splitOnWhitespace } from './formatting'
import { condDefault } from './functions'
import { isNotStringOrArray } from './predicate'
import { reduceObjIndexed } from './objects'

const prepareForTransform = pipe(
  when(isNotStringOrArray, String),
  when(isNotArray, splitOnWhitespace)
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

const decorateWithData = (predicateTransformers, data, breakpointName) =>
  map(([predicate, transformers]) => [
    predicate,
    value => transformValue(transformers, value, data, breakpointName),
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
    [],
    partToTransformerMap
  )

const transformPartsIfPredicatesMatch = predicateTransformerMapping => (
  value,
  data,
  breakpointName
) => {
  predicateTransformerMapping = decorateWithData(
    predicateTransformerMapping,
    data,
    breakpointName
  )
  return map(condDefault(predicateTransformerMapping))(value)
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
  data,
  breakpointName
) =>
  useWith(prepareTransformers(partToPredicateMap, partToTransformerMap), [
    prepareForTransform,
    identity,
  ])(value, data, breakpointName)

export const transformAllParts = transformers => (
  value,
  data,
  breakpointName
) =>
  pipe(
    prepareForTransform,
    map(valuePart =>
      transformValue(transformers, valuePart, data, breakpointName)
    )
  )(value)
