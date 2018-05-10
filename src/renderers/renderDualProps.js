import { compose, zip } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderDeclarations from './renderDeclarations'

const renderDualProps = propNames => (_, value) => {
  const firstProp = value[0]
  const lastProp = value[1] || firstProp
  const directionValues = [firstProp, lastProp]

  return compose(joinWithNewline, renderDeclarations, zip(propNames))(
    directionValues
  )
}
export default renderDualProps