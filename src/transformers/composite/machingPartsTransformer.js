import { map, pipe, __, append } from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'

import {
  splitOnUnnestedWhitespace,
  joinWithSpace,
} from '../../utils/formatting'
import { containsTopLevelGroups } from '../../utils/predicate'
import {
  prepareForTransform,
  transformValue,
  decorateWithData,
} from '../../utils/transformers'
import { condDefault } from '../../utils/functions'
import { reduceObjIndexed } from '../../utils/objects'

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

const matchingPartsTransformer = partToPredicateMap => partToTransformerMap => (
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

export default matchingPartsTransformer
