import { map, compose } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderProp from './renderProp'

const renderManyToManyProps = toProps => () => value =>
  compose(joinWithNewline, map(name => renderProp(name)(value)))(toProps)

export default renderManyToManyProps
