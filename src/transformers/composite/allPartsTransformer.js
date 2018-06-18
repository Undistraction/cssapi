import { transformValues } from '../../utils/transformers'

const allPartsTransformer = transformers => (value, data, breakpointName) =>
  transformValues(transformers, data, breakpointName, value)

export default allPartsTransformer
