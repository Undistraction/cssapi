import { T, identity, cond, curry, append } from 'ramda'

// eslint-disable-next-line import/prefer-default-export
export const condDefault = curry((a, v) => {
  const aWithDefault = append([T, identity], a)
  return cond(aWithDefault)(v)
})
