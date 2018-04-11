import { curry, compose, reduce, toPairs, flip, prop } from 'ramda'

export const reduceObjIndexed = curry((f, acc, v) =>
  compose(reduce(f, acc), toPairs)(v)
)

export const propFlipped = flip(prop)
