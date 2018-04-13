import { evolve, pipe, compose } from 'ramda'
import { ensureArray } from 'ramda-adjunct'
import { joinWithSpace, toKebabCase } from '../utils/formatting'
import { createDeclarationFromTemplate } from '../utils/templates'

const renderDeclaration = (name, value) =>
  pipe(
    evolve({
      name: toKebabCase,
      value: compose(joinWithSpace, ensureArray),
    }),
    createDeclarationFromTemplate
  )({ name, value })

export default renderDeclaration
