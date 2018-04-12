import { map, compose } from 'ramda'
import { joinWithNewline } from '../utils/formatting'
import renderDeclaration from './renderDeclaration'

const renderOneToManyProps = toProps => (_, value) =>
  compose(joinWithNewline, map(name => renderDeclaration(name, value)))(toProps)

export default renderOneToManyProps
