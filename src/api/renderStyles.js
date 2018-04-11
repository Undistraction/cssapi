import { reduce, unless, compose, pipe } from 'ramda'
import { stubString, appendFlipped, compact } from 'ramda-adjunct'
import { joinWithNewline } from '../utils/formatting'
import { isDefaultBreakpoint } from '../utils/predicate'
import renderQuery from '../renderers/renderQuery'

const wrapDeclarationWithQuery = (query, breakpointName) =>
  unless(() => isDefaultBreakpoint(breakpointName), renderQuery(query))

const writeToString = outputString =>
  compose(joinWithNewline, compact, appendFlipped([outputString]))

const renderStyle = (outputString, [name, query, declaration]) =>
  pipe(
    joinWithNewline,
    wrapDeclarationWithQuery(query, name),
    writeToString(outputString)
  )(declaration)

const renderStyles = reduce(renderStyle, stubString())

export default renderStyles
