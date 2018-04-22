import { assoc, pipe, reduce, __ } from 'ramda'
import dataLookupTransformer from '../dataLookupTransformer'

const DATA_NODE_NAMES = [
  `color`,
  `gradient`,
  `font`,
  `scale`,
  `boxShadow`,
  `image`,
]

export const {
  colorLookupTransformer,
  gradientLookupTransformer,
  fontLookupTransformer,
  scaleLookupTransformer,
  boxShadowLookupTransformer,
  imageLookupTransformer,
} = reduce(
  (acc, value) =>
    pipe(dataLookupTransformer, assoc(`${value}LookupTransformer`, __, acc))(
      value
    ),
  {}
)(DATA_NODE_NAMES)
