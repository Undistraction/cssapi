import { identity, reduce, partial, pipe, __ } from 'ramda'
import { ensureArray, list } from 'ramda-adjunct'
import renderProp from '../renderers/renderProp'
import { transformValue } from '../utils/transformers'
import { appendFlipped } from '../utils/list'
import { createBreakpointMapping } from '../utils/breakpoints'

const renderDeclaration = (propName, renderer = renderProp) =>
  pipe(ensureArray, partial(renderer, [propName]), list)

const buildDeclaration = (
  propName,
  data,
  { transformers = [identity], renderer }
) => (acc, { name, query, value }) =>
  pipe(
    transformValue(transformers, __, data, name),
    renderDeclaration(propName, renderer),
    createBreakpointMapping(name, query),
    appendFlipped(acc)
  )(value)

const declarationBuilder = (propName, data, style) =>
  reduce(buildDeclaration(propName, data, style), [])

export default declarationBuilder
