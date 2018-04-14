import { trim, pipe, nth, map, match } from 'ramda'
import { splitOnComma, joinWithCommaSpace } from './formatting'
import { RE_ARGUMENTS_OF_GRADIENT, RE_CSS_FUNCTION_NAME } from '../const/regexp'
import { createCSSFunctionFromTemplate } from './templates'

const matchArguments = value => new RegExp(RE_ARGUMENTS_OF_GRADIENT).exec(value)

// eslint-disable-next-line import/prefer-default-export
export const transformFunctionElements = transform => value => {
  const typeOfFunction = match(RE_CSS_FUNCTION_NAME, value)[1]
  return pipe(
    trim,
    matchArguments,
    nth(1),
    splitOnComma,
    map(trim),
    transform,
    joinWithCommaSpace,
    v => createCSSFunctionFromTemplate({ typeOfFunction, value: v })
  )(value)
}
