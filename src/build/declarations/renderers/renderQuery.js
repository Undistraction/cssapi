import renderQueryHeader from '../../../breakpoints/renderers/renderQueryHeader'
import { indentLines } from '../../../utils/formatting'
import { createQueryFromTemplate } from '../../../utils/templates'

const renderQuery = query => value =>
  createQueryFromTemplate({
    query: renderQueryHeader(query),
    value: indentLines(value),
  })

export default renderQuery
