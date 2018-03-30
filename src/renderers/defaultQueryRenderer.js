import { joinWithNewline } from '../utils/formatting'

const renderer = (queryValue, value) =>
  joinWithNewline([`@media (min-width: ${queryValue}) {`, `  ${value}`, `}`])

export default renderer
