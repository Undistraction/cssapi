import { zip, compose } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderDeclarations from './renderDeclarations'

const renderDualProps = propNames => (_, value) => {
  const bottom = value[1] || value[0]
  const directionValues = [value[0], bottom]

  return compose(joinWithNewline, renderDeclarations, zip(propNames))(
    directionValues
  )
}
export default renderDualProps
