import { T, identity, cond, curry, append, defaultTo } from 'ramda'

// eslint-disable-next-line import/prefer-default-export
export const condDefault = curry((list, value) => {
  const listWithDefault = append([T, identity], list)
  return cond(listWithDefault)(value)
})

export const defaultToObj = defaultTo({})

export const defaultToArray = defaultTo([])
