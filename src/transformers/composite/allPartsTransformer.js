import { map } from 'ramda'
import { prepareForTransform, transformValue } from '../../utils/transformers'

const transformParts = (transformers, value, data, breakpointName) =>
  map(valuePart =>
    transformValue(transformers, valuePart, data, breakpointName)
  )(value)

const allPartsTransformer = transformers => (value, data, breakpointName) => {
  const preparedValue = prepareForTransform(value)
  return transformParts(transformers, preparedValue, data, breakpointName)
}

export default allPartsTransformer
