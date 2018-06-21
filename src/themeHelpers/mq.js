import { apply, flip, pipe, prop } from 'ramda'
import { throwAPIError } from '../errors'
import getApiFromProps from './getApiFromProps'

const propMq = prop(`mq`)

const api = (breakpoint, declarations) =>
  pipe(
    getApiFromProps(throwAPIError),
    propMq,
    flip(apply)([breakpoint, declarations])
  )

export default api
