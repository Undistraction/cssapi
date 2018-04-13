import renderDeclarations from './renderDeclarations'
import { joinWithNewline } from '../utils/formatting'

const renderBaseline = (name, value) => {
  const o = [[`fontSize`, value[0]], [`lineHeight`, value[1]]]
  return joinWithNewline(renderDeclarations(o))
}
export default renderBaseline
