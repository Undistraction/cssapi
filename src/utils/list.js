import {
  append,
  compose,
  converge,
  curry,
  defaultTo,
  equals,
  flip,
  head,
  identity,
  keys,
  length,
  lensIndex,
  nth,
  reduce,
} from 'ramda'
import { isNotUndefined, lengthEq, lensSatisfies } from 'ramda-adjunct'

export const lengthEq1 = lengthEq(1)

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

export const numKeys = compose(length, keys)
