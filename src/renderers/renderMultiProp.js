import { map, compose } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderProp from './renderProp'

// Render a prop that is defined with a single value and mapped to multiple
// values, for example paddingH.
const renderOneToManyProps = toProps => () => value =>
  compose(joinWithNewline, map(name => renderProp(name)(value)))(toProps)

export default renderOneToManyProps
