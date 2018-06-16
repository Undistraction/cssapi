import { both, map, pipe, __ } from 'ramda'
import { isString } from 'ramda-adjunct'
import {
  joinWithSpace,
  splitOnUnnestedWhitespace,
} from '../../utils/formatting'
import { isGroup } from '../../utils/predicate'
import {
  prepareForTransform,
  transformValue,
  transformValues,
} from '../../utils/transformers'

const transformPartsWith = transformers => (value, data, breakpointName) => {
  value = prepareForTransform(value)
  if (both(isString, isGroup)(value)) {
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

export default transformPartsWith
