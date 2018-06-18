import { pipe, zip } from 'ramda'
import { joinWithNewline } from '../../../utils/formatting'
import renderDeclarations from './renderDeclarations'

const renderDualProps = propNames => (_, value) =>
  pipe(zip(propNames), renderDeclarations, joinWithNewline)([value, value])

export default renderDualProps
