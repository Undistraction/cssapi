import { __ } from 'ramda'
import transformer from './transformer'
import { isGradient } from '../utils/predicate'
import {
  transformValue,
  transformFunctionElements,
} from '../utils/transformers'
import transformPartsWith from './composite/transformPartsWith'

const impl = transformers => (value, data, breakpointName) =>
  transformFunctionElements(
    transformValue(transformPartsWith(transformers), __, data, breakpointName)
  )(value)
const gradientTransformer = transformers => (value, data, breakpointName) =>
  transformer(isGradient, impl(transformers))(value, data, breakpointName)

export default gradientTransformer
