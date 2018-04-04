import { joinWithNewline, indentLines } from '../utils/formatting'

const renderQuery = query => value =>
  joinWithNewline([`${query} {`, indentLines(value), `}`])

export default renderQuery
