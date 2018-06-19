import { compose, isEmpty, pipe, reduce, unless } from 'ramda'
import { appendFlipped, compact } from 'ramda-adjunct'
import {
  joinWithDoubleNewlines,
  joinWithNewline,
} from '../../../utils/formatting'
import renderQuery from './renderQuery'

const wrapDeclarationWithQuery = query =>
  unless(() => isEmpty(query), renderQuery(query))

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
