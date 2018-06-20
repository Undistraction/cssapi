import { indentLines } from '../../../utils/formatting'
import { createQueryFromTemplate } from '../../../utils/templates'
import renderQueryHeader from './renderQueryHeader'

const renderQuery = query => value =>
  createQueryFromTemplate({
    query: renderQueryHeader(query),
    value: indentLines(value),
  })

export default renderQuery
