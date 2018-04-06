import { map, compose } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderProp from './renderProp'

const renderOneToManyProps = toProps => (_, value) =>
  compose(joinWithNewline, map(name => renderProp(name, value)))(toProps)

export default renderOneToManyProps
