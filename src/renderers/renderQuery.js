import { joinWithNewline, indentLines } from '../utils/formatting'

const renderer = queryValue => value =>
  joinWithNewline([
    `@media (min-width: ${queryValue}) {`,
    `${indentLines(value)}`,
    `}`,
  ])

export default renderer
