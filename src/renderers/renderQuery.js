import { joinWithNewline, indentLines } from '../utils/formatting'

const renderQuery = widthBreakpoint => value =>
  joinWithNewline([
    `@media (min-width: ${widthBreakpoint}) {`,
    `${indentLines(value)}`,
    `}`,
  ])

export default renderQuery
