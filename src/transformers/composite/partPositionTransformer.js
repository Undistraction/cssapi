import { pipe, adjust, __ } from 'ramda'

import { prepareForTransform, transformValue } from '../../utils/transformers'

const partPositionTransformer = position => transformers => (
  value,
  data,
  breakpointName
) =>
  pipe(
    prepareForTransform,
    adjust(transformValue(transformers, __, data, breakpointName), position)
  )(value)

export default partPositionTransformer
