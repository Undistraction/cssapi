import { prepareForTransform, transformValues } from '../../utils/transformers'

const allPartsTransformer = transformers => (value, data, breakpointName) => {
  const preparedValue = prepareForTransform(value)
  return transformValues(transformers, preparedValue, data, breakpointName)
}

export default allPartsTransformer
