import { compose, zip } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import { DIRECTIONS_LIST_HORIZONTAL } from '../const'
import renderProps from './renderProps'

const renderHorizontalDirections = (name, value) => {
  const left = value[1] || value[0]
  const directionValues = [value[0], left]

  return compose(joinWithNewline, renderProps, zip(DIRECTIONS_LIST_HORIZONTAL))(
    directionValues
  )
}
export default renderHorizontalDirections
