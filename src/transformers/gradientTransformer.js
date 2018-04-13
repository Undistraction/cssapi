import { match, pipe, nth, trim, map, __ } from 'ramda'
import transformer from './transformer'
import { isGradient } from '../utils/predicate'
import { transformMatchingParts, transformValue } from '../utils/transformers'
import colorNameToColorValueTransformer from './colorNameToColorValueTransformer'
import multiArgStyleMap from '../api/mulitArgStyleMap'
import {
  REGEXP_ARGUMENTS_OF_GRADIENT,
  REGEXP_GRADIENT_TYPE,
} from '../const/regexp'
import { splitOnComma, joinWithCommaSpace } from '../utils/formatting'
import { createGradientFromTemplate } from '../utils/templates'

const matchArguments = value =>
  new RegExp(REGEXP_ARGUMENTS_OF_GRADIENT).exec(value)

const impl = (value, data, breakpointName) => {
  const trans = transformMatchingParts(multiArgStyleMap.gradient)({
    color: colorNameToColorValueTransformer,
  })
  const typeOfGradient = match(REGEXP_GRADIENT_TYPE, value)[0]
  return pipe(
    trim,
    matchArguments,
    nth(1),
    splitOnComma,
    map(trim),
    transformValue(trans, __, data, breakpointName),
    joinWithCommaSpace,
    v => createGradientFromTemplate({ typeOfGradient, value: v })
  )(value)
}

const gradientTransformer = (value, data, breakpointName) =>
  transformer(isGradient, impl)(value, data, breakpointName)

export default gradientTransformer
