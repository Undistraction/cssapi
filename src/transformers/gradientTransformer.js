import { __ } from 'ramda'
import transformer from './transformer'
import { isGradient } from '../utils/predicate'
import { transformValue } from '../utils/transformers'
import colorNameToColorTransformer from './colorNameToColorTransformer'
import { transformFunctionElements } from '../utils/css'
import partsTransformer from './composite/partsTransformer'

const impl = (value, data, breakpointName) =>
  transformFunctionElements(
    transformValue(
      partsTransformer(colorNameToColorTransformer),
      __,
      data,
      breakpointName
    )
  )(value)

const gradientTransformer = (value, data, breakpointName) =>
  transformer(isGradient, impl)(value, data, breakpointName)

export default gradientTransformer
