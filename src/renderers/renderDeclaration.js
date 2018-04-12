import { evolve, pipe, compose } from 'ramda'
import { ensureArray } from 'ramda-adjunct'
import dasherize from 'dasherize'
import { joinWithSpace } from '../utils/formatting'
import { createDeclarationFromTemplate } from '../utils/templates';

const renderDeclaration = (name, value) => pipe(
  evolve({
    name: dasherize,
    value: compose(joinWithSpace, ensureArray),
  }),
  createDeclarationFromTemplate,
)({ name, value })

export default renderDeclaration
