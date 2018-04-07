import {
  identity,
  compose,
  reduce,
  defaultTo,
  partial,
  pipe,
  __,
  append,
} from 'ramda'
import { ensureArray, stubArray } from 'ramda-adjunct'
import renderProp from '../renderers/renderProp'
import { transformValue } from '../utils/transformers'

const renderDeclaration = (renderer, name) =>
  compose(partial(defaultTo(renderProp, renderer), [name]), ensureArray)

const buildDeclaration = (
  name,
  data,
  { transformers = [identity], renderer }
) => (acc, [breakpointName, query, value]) => pipe(
    transformValue(transformers, __, data),
    renderDeclaration(renderer, name),
    v => append([breakpointName, query, [v]], acc)
  )(value)

const declarationBuilder = (name, data, style) =>
  reduce(buildDeclaration(name, data, style), stubArray())

export default declarationBuilder
