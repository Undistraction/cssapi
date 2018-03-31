import { joinWithNewline, indentLines } from '../utils/formatting'

const renderQuery = queryValue => value =>
  joinWithNewline([
    `@media (min-width: ${queryValue}) {`,
    `${indentLines(value)}`,
    `}`,
  ])

export default renderQuery
