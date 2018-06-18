import { transformValueAt } from '../../utils/transformers'

const partPositionTransformer = position => transformers => (
  value,
  data,
  breakpointName
) => transformValueAt(transformers, data, breakpointName, position)(value)

export default partPositionTransformer
