import { map, apply } from 'ramda'
import renderDeclaration from './renderDeclaration'

const renderDeclarations = map(apply(renderDeclaration))

export default renderDeclarations
