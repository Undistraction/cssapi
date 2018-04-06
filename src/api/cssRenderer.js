import {
  unless,
  always,
  compose,
  reduce,
  defaultTo,
  partial,
  pipe,
  __,
} from 'ramda'
import { stubString, appendFlipped, ensureArray, compact } from 'ramda-adjunct'
import renderQuery from '../renderers/renderQuery'
import renderProp from '../renderers/renderProp'
import { joinWithNewline } from '../utils/formatting'
import { transformValue } from '../utils/transformers'
import { isDefaultBreakpoint } from '../utils/predicate'

const renderDeclaration = (renderer, name) =>
  compose(partial(defaultTo(renderProp, renderer), [name]), ensureArray)

const wrapDeclarationWithQuery = (query, breakpointName) =>
  unless(always(isDefaultBreakpoint(breakpointName)), renderQuery(query))

const writeToString = css =>
  compose(joinWithNewline, compact, appendFlipped([css]))

const renderBreakpoint = (name, data, { transformers, renderer }) => (
  acc,
  [breakpointName, query, value]
) =>
  pipe(
    transformValue(transformers, __, data),
    renderDeclaration(renderer, name),
    wrapDeclarationWithQuery(query, breakpointName),
    writeToString(acc)
  )(value)

const cssRenderer = (name, data, style) =>
  reduce(renderBreakpoint(name, data, style), stubString())

export default cssRenderer
