import { curry, compose, reduce, toPairs, addIndex, flip, prop } from 'ramda'

// eslint-disable-next-line import/prefer-default-export
export const reduceObjIndexed = curry((f, acc, v) =>
  compose(reduce(f, acc), toPairs)(v)
)

export const reduceWithIndex = addIndex(reduce)

export const propFlipped = flip(prop)
