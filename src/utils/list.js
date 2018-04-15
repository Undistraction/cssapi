import {
  curry,
  length,
  compose,
  equals,
  head,
  flip,
  nth,
  defaultTo,
  append,
  converge,
  reduce,
  keys,
  identity,
  lensIndex,
} from 'ramda'
import { lensSatisfies, isNotUndefined } from 'ramda-adjunct'

export const lengthEq = curry((l, v) => compose(equals(l), length)(v))

export const headEquals = value => compose(equals(value), head)

export const nthFlipped = flip(nth)

export const nthOr = curry((defaultValue, n, a) =>
  defaultTo(defaultValue, nth(n, a))
)

export const appendFlipped = flip(append)

export const reduceWithKeys = reducer =>
  converge(reduce(reducer), [identity, keys])

export const hasIndex = curry((n, l) =>
  lensSatisfies(isNotUndefined, lensIndex(n))(l)
)
