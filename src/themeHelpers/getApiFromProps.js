import { pipe, prop, unless } from 'ramda'
import { isFunction, isPlainObj } from 'ramda-adjunct'
import { noAPIOnThemeError, noThemeObjectError } from '../errors'

const getApiFromProps = errorFunc => props =>
  pipe(
    prop(`theme`),
    unless(isPlainObj, value => errorFunc(noThemeObjectError(value))),
    prop(`api`),
    unless(isFunction, value => errorFunc(noAPIOnThemeError(value)))
  )(props)

export default getApiFromProps
