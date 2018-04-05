import { replace, curry } from 'ramda'
import { REGEXP_TOKEN } from '../const'

// eslint-disable-next-line import/prefer-default-export
export const replaceToken = curry((template, value) =>
  replace(REGEXP_TOKEN, value, template)
)
