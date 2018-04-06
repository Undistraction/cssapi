import { replace, curry, compose, split } from 'ramda'
import { REGEXP_TOKEN, REGEXP_CAPITAL_LETTERS } from '../const'

export const replaceToken = curry((template, value) =>
  replace(REGEXP_TOKEN, value, template)
)

export const splitCamelcase = compose(
  split(` `),
  replace(REGEXP_CAPITAL_LETTERS, ` $1`)
)
