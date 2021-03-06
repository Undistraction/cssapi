import {
  append,
  compose,
  curry,
  flip,
  prop,
  reduce,
  toPairs,
  when,
} from 'ramda'

export const reduceObjIndexed = curry((f, acc, v) =>
  compose(reduce(f, acc), toPairs)(v)
)

export const propFlipped = flip(prop)

export const filterKeys = curry((predicate, obj) =>
  reduceObjIndexed(
    (keys, [key, value]) => when(() => predicate(value), append(key))(keys),
    [],
    obj
  )
)
