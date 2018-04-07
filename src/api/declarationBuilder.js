import {
  identity,
  compose,
  reduce,
  defaultTo,
  partial,
  pipe,
  __,
} from 'ramda'
import { list, ensureArray, stubArray } from 'ramda-adjunct'
import renderProp from '../renderers/renderProp'
import { transformValue } from '../utils/transformers'
import { appendFlipped } from '../utils/list';

const renderDeclaration = (renderer, name) =>
  compose(partial(defaultTo(renderProp, renderer), [name]), ensureArray)

const buildDeclaration = (
  name,
  data,
  { transformers = [identity], renderer }
) => (acc, [breakpointName, query, value]) => pipe(
  transformValue(transformers, __, data),
  renderDeclaration(renderer, name),
  list,
  appendFlipped([breakpointName, query]),
  appendFlipped(acc),
)(value)

const declarationBuilder = (name, data, style) =>
  reduce(buildDeclaration(name, data, style), stubArray())

export default declarationBuilder
