import { compose, zip } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import { DIRECTIONS_LIST_VERTICAL } from '../const'
import renderProps from './renderProps'

const renderVerticalDirections = (name, value) => {
  const bottom = value[1] || value[0]
  const directionValues = [value[0], bottom]

  return compose(joinWithNewline, renderProps, zip(DIRECTIONS_LIST_VERTICAL))(
    directionValues
  )
}
export default renderVerticalDirections
