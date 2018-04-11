import { identity, reduce, partial, pipe, __ } from 'ramda'
import { ensureArray, list } from 'ramda-adjunct'
import renderProp from '../renderers/renderProp'
import { transformValue } from '../utils/transformers'
import { appendFlipped } from '../utils/list'
import { createBreakpointMapping } from '../utils/breakpoints'

const renderDeclaration = (name, renderer = renderProp) =>
  pipe(ensureArray, partial(renderer, [name]), list)

const buildDeclaration = (
  name,
  data,
  { transformers = [identity], renderer }
) => (acc, [breakpointName, query, value]) =>
  pipe(
    transformValue(transformers, __, data, breakpointName),
    renderDeclaration(name, renderer),
    createBreakpointMapping(breakpointName, query),
    appendFlipped(acc)
  )(value)

const declarationBuilder = (name, data, style) =>
  reduce(buildDeclaration(name, data, style), [])

export default declarationBuilder
