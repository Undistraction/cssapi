import renderHeader from '../../../breakpoints/renderers/renderHeader'
import { indentLines } from '../../../utils/formatting'
import { createQueryFromTemplate } from '../../../utils/templates'

const renderQuery = query => value =>
  createQueryFromTemplate({
    query: renderHeader(query),
    value: indentLines(value),
  })

export default renderQuery
