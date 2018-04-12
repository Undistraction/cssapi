import { match, pipe, nth, trim, map } from 'ramda'
import transformer from './transformer'
import { isGradient } from '../utils/predicate'
import { transformMatchingParts } from '../utils/transformers'
import colorNameToColorValueTransformer from './colorNameToColorValueTransformer'
import multiArgStyleMap from '../api/mulitArgStyleMap'
import { REGEXP_ARGUMENTS_OF_GRADIENT, REGEXP_GRADIENT_TYPE } from '../const/regexp'
import { splitOnComma, joinWithCommaSpace } from '../utils/formatting'

const rExec = value => new RegExp(REGEXP_ARGUMENTS_OF_GRADIENT).exec(value)

const impl = (value, data, breakpointName) => {
  const t = transformMatchingParts(multiArgStyleMap.gradient)({
    color: colorNameToColorValueTransformer,
  })
  const typeOfGradient = match(REGEXP_GRADIENT_TYPE, value)[0]
  const r = pipe(
    trim,
    rExec,
    nth(1),
    splitOnComma,
    map(trim),
    v => t(v, data, breakpointName),
    joinWithCommaSpace,
    v => `${typeOfGradient}(${v})`
  )(value)
  return r
}

const gradientTransformer = (value, data, breakpointName) =>
  transformer(isGradient, impl)(value, data, breakpointName)

export default gradientTransformer
