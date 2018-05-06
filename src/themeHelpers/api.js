import { apply, flip, pipe, prop, unless } from 'ramda'
import { isFunction, isPlainObj } from 'ramda-adjunct'
import { noAPIOnThemeError, noThemeObjectError, throwAPIError } from '../errors'

const api = declarations => props => {
  console.log(`VV`, props)
  return pipe(
    prop(`theme`),
    unless(isPlainObj, value => throwAPIError(noThemeObjectError(value))),
    prop(`api`),
    unless(isFunction, value => throwAPIError(noAPIOnThemeError(value))),
    flip(apply)([declarations])
  )(props)
}

export default api
