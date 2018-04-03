import { compose, zip } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import { DIRECTIONS_LIST } from '../const'
import renderProps from './renderProps'

const renderDirectionProps = (name, value) => {
  const top = value[0]
  const right = value[1] || value[0]
  const bottom = value[2] || value[0]
  const left = value[3] || value[1] || value[0]
  const directionValues = [top, right, bottom, left]
  const a = zip(DIRECTIONS_LIST, directionValues)

  return compose(joinWithNewline, renderProps)(a)
}
export default renderDirectionProps
