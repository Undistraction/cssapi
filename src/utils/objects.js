import {
  map,
  curry,
  compose,
  reduce,
  toPairs,
  addIndex,
  flip,
  prop,
} from 'ramda'

export const reduceObjIndexed = curry((f, acc, v) =>
  compose(reduce(f, acc), toPairs)(v)
)

export const reduceWithIndex = addIndex(reduce)

export const propFlipped = flip(prop)

export const mapWithIndex = addIndex(map)
