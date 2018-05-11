import {
  __,
  both,
  identity,
  ifElse,
  map,
  partial,
  pipe,
  reduce,
  trim,
} from 'ramda'
import { ensureArray, isString, list } from 'ramda-adjunct'
import renderDeclaration from '../renderers/renderDeclaration'
import { createBreakpointMapping } from '../utils/breakpoints'
import {
  joinWithCommaSpace,
  joinWithSpace,
  splitOnUnnestedComma,
  splitOnUnnestedWhitespace,
} from '../utils/formatting'
import { appendFlipped } from '../utils/list'
import { isGroups } from '../utils/predicate'
import { transformValue } from '../utils/transformers'

const transformGroups = (transformers, data, name) =>
  pipe(
    splitOnUnnestedComma,
    map(trim),
    map(
      pipe(
        splitOnUnnestedWhitespace,
        map(transformValue(transformers, __, data, name)),
        joinWithSpace
      )
    ),
    joinWithCommaSpace
  )

const transform = (transformers, name, data) =>
  ifElse(
    both(isString, isGroups),
    transformGroups(transformers, data, name),
    transformValue(transformers, __, data, name)
  )

const render = (propName, renderer) =>
  pipe(ensureArray, partial(renderer, [propName]), list)

const createDeclaration = (
  propName,
  data,
  { transformers = identity, renderer = renderDeclaration },
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
