import { apply, flip, pipe } from 'ramda'
import { throwAPIError } from '../errors'
import getApiFromProps from './getApiFromProps'

const api = declarationsObj =>
  pipe(getApiFromProps(throwAPIError), flip(apply)([declarationsObj]))

export default api
