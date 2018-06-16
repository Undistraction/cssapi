import { identity, partial, pipe, reduce, __ } from 'ramda'
import { appendFlipped, ensureArray, list } from 'ramda-adjunct'
import renderSingleDeclaration from '../../renderers/renderSingleDeclaration'
import { createBreakpointMapping } from '../../utils/breakpointMapping'
import { transformDeclaration } from '../../utils/transformers'

const renderDeclaration = (propName, renderer) =>
  pipe(ensureArray, partial(renderer, [propName]), list)

const processDeclaration = (
  propName,
  data,
  { transformers = identity, renderer = renderSingleDeclaration },
  { name, query, value }
) =>
  pipe(
    transformDeclaration(transformers, name, data),
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
