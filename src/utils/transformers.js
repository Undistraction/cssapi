import { compose, map, identity, cond, append, T, toString, when } from 'ramda'
import { isNotString } from 'ramda-adjunct'

import { joinWithSpace, splitOnWhitespace } from './formatting'
import { mapWithIndex } from './list'

const defaultCondIdentity = [T, identity]

const mapToTransformerOrIdentity = transformers =>
  mapWithIndex((value, idx) => {
    const transformer = transformers[idx] || identity
    return transformer(value)
  })

const mapAndDetectToTransformerOrIdentity = transformers => v =>
  map(cond(append(defaultCondIdentity, transformers)), v)

export const repeatedProp = transformer =>
  compose(
    joinWithSpace,
    map(transformer),
    splitOnWhitespace,
    when(isNotString, toString)
  )

export const multiProps = transformers =>
  compose(
    joinWithSpace,
    mapToTransformerOrIdentity(transformers),
    splitOnWhitespace
  )

export const detectProps = transformers =>
  compose(
    joinWithSpace,
    mapAndDetectToTransformerOrIdentity(transformers),
    splitOnWhitespace
  )
