import { pipe, objOf, over } from 'ramda'
import { lTransformers } from '../../utils/expanders'

const wrapExpander = wrapper => (propName, style) =>
  pipe(over(lTransformers, wrapper), objOf(propName))(style)

export default wrapExpander
