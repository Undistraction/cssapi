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

const render = (propName, renderer = renderDeclaration) =>
  pipe(ensureArray, partial(renderer, [propName]), list)

const buildGroups = (transformers, data, name) =>
  pipe(
    splitOnUnnestedComma,
    map(trim),
    transformValue(transformers, __, data, name),
    joinWithCommaSpace
  )

const buildDeclaration = (
  propName,
  data,
  { transformers = [identity], renderer }
) => (acc, { name, query, value }) =>
    pipe(
      ifElse(
        both(isString, containsTopLevelGroups),
        buildGroups(transformers, data, name),
        transformValue(transformers, __, data, name)
      ),
      render(propName, renderer),
      createBreakpointMapping(name, query),
      appendFlipped(acc)
    )(value)

const declarationBuilder = (propName, data, style) =>
  reduce(buildDeclaration(propName, data, style), [])

export default declarationBuilder
