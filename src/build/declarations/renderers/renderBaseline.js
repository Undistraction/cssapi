import { pipe, zip } from 'ramda'
import { joinWithNewline } from '../../../utils/formatting'
import renderDeclarations from './renderDeclarations'

const PROPS = [`fontSize`, `lineHeight`]

const renderBaseline = (_, value) =>
  pipe(zip(PROPS), renderDeclarations, joinWithNewline)(value)

export default renderBaseline
