import { compose, zip } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderDeclarations from './renderDeclarations'

const renderDualProps = propNames => (_, value) => {
  const directionValues = [value, value]

  return compose(joinWithNewline, renderDeclarations, zip(propNames))(
    directionValues
  )
}
export default renderDualProps
