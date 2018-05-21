import { apply, flip, pair, pipe } from 'ramda'
import { throwMixinError } from '../errors'
import getApiFromProps from './getApiFromProps'

const mixin = f => (...args) => props =>
  pipe(
    getApiFromProps(throwMixinError),
    flip(pair)(props),
    apply(f),
    flip(apply)(args)
  )(props)

export default mixin
