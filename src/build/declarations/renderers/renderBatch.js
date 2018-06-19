import { compose, isEmpty, pipe, reduce, unless } from 'ramda'
import { appendFlipped, compact } from 'ramda-adjunct'
import {
  joinWithDoubleNewlines,
  joinWithNewline,
} from '../../../utils/formatting'
import renderQuery from './renderQuery'

const writeToString = outputString =>
  compose(joinWithDoubleNewlines, compact, appendFlipped([outputString]))

const renderStyle = (outputString, { query, value }) =>
  pipe(
    joinWithNewline,
    unless(() => isEmpty(query), renderQuery(query)),
    writeToString(outputString)
  )(value)

const renderBatch = reduce(renderStyle, ``)

export default renderBatch
