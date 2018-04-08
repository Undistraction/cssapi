import { pipe, objOf, over, identity } from 'ramda'
import { lTransformers } from '../../utils/expanders'

const wrapExpander = ({ wrapper = identity } = {}) => (propName, style) =>
  pipe(over(lTransformers, wrapper), objOf(propName))(style)

export default wrapExpander
