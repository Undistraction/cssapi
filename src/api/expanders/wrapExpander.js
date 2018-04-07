import { pipe, objOf, over } from 'ramda'
import { lTransformers } from '../../utils/expanders'

const wrapExpander = ({ mainWrapper } = {}) => (propName, style) =>
  pipe(over(lTransformers, mainWrapper), objOf(propName))(style)

export default wrapExpander
