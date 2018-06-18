import { apply, map } from 'ramda'
import renderSingleDeclaration from './renderSingleDeclaration'

const renderDeclarations = map(apply(renderSingleDeclaration))

export default renderDeclarations
