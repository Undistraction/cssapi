import { map, compose } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderDeclaration from './renderDeclaration'

const renderManyToManyProps = toProps => (name, value) =>
  compose(joinWithNewline, map(n => renderDeclaration(n)(value)))(toProps)

export default renderManyToManyProps
