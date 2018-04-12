import { compose, zip } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import { DIRECTIONS_LIST_VERTICAL } from '../const/expanders'
import renderDeclarations from './renderDeclarations'

const renderVerticalDirectionProps = (name, value) => {
  const bottom = value[1] || value[0]
  const directionValues = [value[0], bottom]

  return compose(joinWithNewline, renderDeclarations, zip(DIRECTIONS_LIST_VERTICAL))(
    directionValues
  )
}
export default renderVerticalDirectionProps
