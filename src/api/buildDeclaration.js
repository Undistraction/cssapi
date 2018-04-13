import {
  identity,
  reduce,
  partial,
  pipe,
  __,
  ifElse,
  both,
  map,
  trim,
} from 'ramda'
import { ensureArray, list, isString } from 'ramda-adjunct'
import renderDeclaration from '../renderers/renderDeclaration'
import { transformValue } from '../utils/transformers'
import { appendFlipped } from '../utils/list'
import { createBreakpointMapping } from '../utils/breakpoints'
import { containsTopLevelGroups } from '../utils/predicate'
import { joinWithCommaSpace, splitOnUnnestedComma } from '../utils/formatting'

const transformGroups = (transformers, data, name) =>
  pipe(
    splitOnUnnestedComma,
    map(trim),
    transformValue(transformers, __, data, name),
    joinWithCommaSpace
  )

const transform = (transformers, name, data) =>
  ifElse(
    both(isString, containsTopLevelGroups),
    transformGroups(transformers, data, name),
    transformValue(transformers, __, data, name)
  )

const render = (propName, renderer = renderDeclaration) =>
  pipe(ensureArray, partial(renderer, [propName]), list)

const createDeclaration = (
  propName,
  data,
  { transformers = identity, renderer },
  { name, query, value }
) =>
  pipe(
    transform(transformers, name, data),
    render(propName, renderer),
    createBreakpointMapping(name, query)
  )(value)

const buildDeclarationReducer = (propName, data, style) => (
  declarations,
  breakpointMapping
) =>
  pipe(createDeclaration, appendFlipped(declarations))(
    propName,
    data,
    style,
    breakpointMapping
  )

const buildDeclaration = (propName, data, style) =>
  reduce(buildDeclarationReducer(propName, data, style), [])

export default buildDeclaration
