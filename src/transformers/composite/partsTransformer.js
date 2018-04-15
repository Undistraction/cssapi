import { isString } from 'ramda-adjunct'
import { map, pipe, __ } from 'ramda'

import {
  splitOnUnnestedWhitespace,
  joinWithSpace,
} from '../../utils/formatting'
import { containsTopLevelGroups } from '../../utils/predicate'
import { prepareForTransform, transformValue } from '../../utils/transformers'

const partsTransformer = transformers => (value, data, breakpointName) => {
  value = prepareForTransform(value)
  if (isString(value) && containsTopLevelGroups(value)) {
    return map(
      pipe(
        splitOnUnnestedWhitespace,
        transformValue(transformers, __, data, breakpointName),
        joinWithSpace
      )
    )(value)
  }

  return map(v => transformValue(transformers, v, data, breakpointName), value)
}

export default partsTransformer
