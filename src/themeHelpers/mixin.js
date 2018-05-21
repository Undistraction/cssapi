import { apply, flip, of, pipe } from 'ramda'
import { throwMixinError } from '../errors'
import getApiFromProps from './getApiFromProps'

const mixin = f => (...args) => props =>
  pipe(getApiFromProps(throwMixinError), of, apply(f), flip(apply)(args))(props)

export default mixin
