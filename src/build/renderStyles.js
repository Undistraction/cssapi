import { reduce, unless, compose, pipe } from 'ramda'
import { appendFlipped, compact } from 'ramda-adjunct'
import { joinWithNewline, joinWithDoubleNewlines } from '../utils/formatting'
import { isDefaultBreakpoint } from '../utils/predicate'
import renderQuery from '../renderers/renderQuery'

const wrapDeclarationWithQuery = (query, breakpointName) =>
  unless(() => isDefaultBreakpoint(breakpointName), renderQuery(query))

const writeToString = outputString =>
  compose(joinWithDoubleNewlines, compact, appendFlipped([outputString]))

const renderStyle = (outputString, { name, query, value }) =>
  pipe(
    joinWithNewline,
    wrapDeclarationWithQuery(query, name),
    writeToString(outputString)
  )(value)

const renderStyles = reduce(renderStyle, ``)

export default renderStyles
