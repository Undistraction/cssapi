import { compose, pipe, reduce, unless } from 'ramda'
import { appendFlipped, compact, isNull } from 'ramda-adjunct'
import renderQuery from '../../renderers/renderQuery'
import { joinWithDoubleNewlines, joinWithNewline } from '../../utils/formatting'

const wrapDeclarationWithQuery = query =>
  unless(() => isNull(query), renderQuery(query))

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
