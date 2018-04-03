import { map, compose } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderProp from './renderProp'

const renderManyToManyProps = toProps => (name, value) =>
  compose(joinWithNewline, map(n => renderProp(n)(value)))(toProps)

export default renderManyToManyProps
