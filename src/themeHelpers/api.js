import { apply, flip, pipe } from 'ramda'
import { throwAPIError } from '../errors'
import getApiFromProps from './getApiFromProps'

const api = declarations =>
  pipe(getApiFromProps(throwAPIError), flip(apply)([declarations]))

export default api
