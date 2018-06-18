import { identity, partial, pipe, reduce, __ } from 'ramda'
import { appendFlipped, ensureArray, list } from 'ramda-adjunct'
import { createBreakpointMapping } from '../../utils/breakpointMapping'
import { transformDeclarationValue } from '../../utils/transformers'
import renderSingleDeclaration from './renderers/renderSingleDeclaration'

const renderDeclaration = (propName, renderer) =>
  pipe(ensureArray, partial(renderer, [propName]), list)

const processDeclaration = (
  propName,
  data,
  { transformers = identity, renderer = renderSingleDeclaration },
  { name, query, value }
) =>
  pipe(
    transformDeclarationValue(transformers, name, data),
    renderDeclaration(propName, renderer),
    createBreakpointMapping(name, __, query)
  )(value)

// Create a map of curried 'processDeclaration' functions for each property,
// ready to render styles when they receive a value
const reducer = (propName, data, style) => (declarations, breakpointMapping) =>
  pipe(processDeclaration, appendFlipped(declarations))(
    propName,
    data,
    style,
    breakpointMapping
  )

const createDeclarationProcessor = (propName, data, style) =>
  reduce(reducer(propName, data, style), [])

export default createDeclarationProcessor
