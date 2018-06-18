import { compose, evolve, pipe } from 'ramda'
import { ensureArray } from 'ramda-adjunct'
import { joinWithSpace, toKebabCase } from '../../../utils/formatting'
import { createDeclarationFromTemplate } from '../../../utils/templates'

const renderSingleDeclaration = (name, value) =>
  pipe(
    evolve({
      name: toKebabCase,
      value: compose(joinWithSpace, ensureArray),
    }),
    createDeclarationFromTemplate
  )({ name, value })

export default renderSingleDeclaration
