import { T, identity, cond, curry, append, find, pipe, defaultTo } from 'ramda'

export const condDefault = curry((list, value) => {
  const listWithDefault = append([T, identity], list)
  return cond(listWithDefault)(value)
})

export const findOr = curry((defaultValue, fn, arr) =>
  pipe(find(fn), defaultTo(defaultValue))(arr)
)
