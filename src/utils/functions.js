import { T, identity, cond, curry, append } from 'ramda'

// eslint-disable-next-line import/prefer-default-export
export const condDefault = curry((list, value) => {
  const listWithDefault = append([T, identity], list)
  return cond(listWithDefault)(value)
})
