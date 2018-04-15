import { isString } from 'ramda-adjunct'
import { map, pipe, __, both } from 'ramda'

import {
  splitOnUnnestedWhitespace,
  joinWithSpace,
} from '../../utils/formatting'
import { isGroups } from '../../utils/predicate'
import {
  prepareForTransform,
  transformValue,
  transformValues,
} from '../../utils/transformers'

const partsTransformer = transformers => (value, data, breakpointName) => {
  value = prepareForTransform(value)
  if (both(isString, isGroups)(value)) {
    return map(
      pipe(
        splitOnUnnestedWhitespace,
        transformValue(transformers, __, data, breakpointName),
        joinWithSpace
      )
    )(value)
  }

  return transformValues(transformers, value, data, breakpointName)
}

export default partsTransformer
