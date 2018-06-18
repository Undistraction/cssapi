import { isGradient } from '../utils/predicate'
import {
  transformFunctionElements,
  transformValue,
} from '../utils/transformers'
import transformPartsWith from './composite/transformPartsWith'
import transformer from './transformer'

const impl = transformers => (value, data, breakpointName) =>
  transformFunctionElements(
    transformValue(transformPartsWith(transformers), data, breakpointName)
  )(value)

const gradientTransformer = transformers => (value, data, breakpointName) =>
  transformer(isGradient, impl(transformers))(value, data, breakpointName)

export default gradientTransformer
