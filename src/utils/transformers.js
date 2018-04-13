import { map, when, pipe, curry, reduce, append, __ } from 'ramda'
import { ensureArray, isNotUndefined, isString } from 'ramda-adjunct'

import { splitOnUnnestedWhitespace, joinWithSpace } from './formatting'
import { condDefault } from './functions'
import { isNotStringOrArray, containsTopLevelGroups } from './predicate'
import { reduceObjIndexed } from './objects'

const prepareForTransform = pipe(
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

export const transformParts = (transformers, value, data, breakpointName) =>
  map(valuePart =>
    transformValue(transformers, valuePart, data, breakpointName)
  )(value)

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
) => {
  const transformers = prepareTransformers(
    partToPredicateMap,
    partToTransformerMap
  )
  value = prepareForTransform(value)

  if (containsTopLevelGroups(value)) {
    return map(
      pipe(
        splitOnUnnestedWhitespace,
        transformValue(transformers, __, data, breakpointName),
        joinWithSpace
      )
    )(value)
  }

  return transformValue(transformers, value, data, breakpointName)
}

export const transformAllParts = transformers => (
  value,
  data,
  breakpointName
) => {
  const preparedValue = prepareForTransform(value)
  return transformParts(transformers, preparedValue, data, breakpointName)
}
