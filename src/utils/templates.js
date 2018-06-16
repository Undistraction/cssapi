import { curry, flip, pipe, subtract } from 'ramda'
import {
  CSS_FUNCTION_TEMPLATE,
  DECLARATION_TEMPLATE,
  QUERY_MAX_TEMPLATE,
  QUERY_MIN_MAX_TEMPLATE,
  QUERY_MIN_TEMPLATE,
  QUERY_TEMPLATE,
} from '../const/templates'
import { adjustNumberWithUnit } from './converters'
import { replaceToken, replaceTokens } from './formatting'

const subtractMinimumEm = flip(subtract)(0.01)

const reduceMaxWidthValue = adjustNumberWithUnit(subtractMinimumEm)

export const createQueryMinHeaderFromTemplate = replaceToken(
  QUERY_MIN_TEMPLATE,
  `minWidth`
)

export const createQueryMaxHeaderFromTemplate = pipe(
  reduceMaxWidthValue,
  replaceToken(QUERY_MAX_TEMPLATE, `maxWidth`)
)

export const createQueryMinMaxHeaderFromTemplate = curry((maxWidth, minWidth) =>
  replaceTokens(QUERY_MIN_MAX_TEMPLATE, {
    minWidth,
    maxWidth: reduceMaxWidthValue(maxWidth),
  })
)

export const createQueryFromTemplate = replaceTokens(QUERY_TEMPLATE)

export const createDeclarationFromTemplate = replaceTokens(DECLARATION_TEMPLATE)

export const createCSSFunctionFromTemplate = typeOfFunction => value =>
  replaceTokens(CSS_FUNCTION_TEMPLATE, {
    typeOfFunction,
    value,
  })
