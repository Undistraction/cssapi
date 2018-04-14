import { __ } from 'ramda'
import transformer from './transformer'
import { isGradient } from '../utils/predicate'
import { transformValue } from '../utils/transformers'
import matchingPartsTransformer from '../transformers/composite/machingPartsTransformer'
import colorNameToColorTransformer from './colorNameToColorTransformer'
import multiArgStyleMap from '../api/mulitArgStyleMap'
import { transformFunctionElements } from '../utils/css'

const impl = (value, data, breakpointName) => {
  const trans = matchingPartsTransformer(multiArgStyleMap.gradient)({
    color: colorNameToColorTransformer,
  })
  return transformFunctionElements(
    transformValue(trans, __, data, breakpointName)
  )(value)
}

const gradientTransformer = (value, data, breakpointName) =>
  transformer(isGradient, impl)(value, data, breakpointName)

export default gradientTransformer
