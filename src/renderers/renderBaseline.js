import { compose } from 'ramda'
import renderDeclarations from './renderDeclarations'
import { joinWithNewline } from '../utils/formatting'

const renderBaseline = (name, value) =>
  compose(joinWithNewline, renderDeclarations)([
    [`fontSize`, value[0]],
    [`lineHeight`, value[1]],
  ])

export default renderBaseline
