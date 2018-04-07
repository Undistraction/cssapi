import {
  curry,
  length,
  addIndex,
  map,
  compose,
  equals,
  head,
  flip,
  nth,
  defaultTo,
  append,
} from 'ramda'

export const mapWithIndex = addIndex(map)

export const lengthEq = curry((l, v) => compose(equals(l), length)(v))

export const headEquals = value => compose(equals(value), head)

export const nthFlipped = flip(nth)

export const nthOr = curry((defaultValue, n, a) =>
  defaultTo(defaultValue, nth(n, a))
)

export const appendFlipped = flip(append)