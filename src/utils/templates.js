import { curry } from 'ramda'
import {
  CSS_FUNCTION_TEMPLATE,
  DECLARATION_TEMPLATE,
  QUERY_MIN_MAX_TEMPLATE,
  QUERY_MIN_TEMPLATE,
  QUERY_TEMPLATE,
} from '../const/templates'
import { replaceToken, replaceTokens } from './formatting'

export const createQueryMinHeaderFromTemplate = replaceToken(
  QUERY_MIN_TEMPLATE,
  `minWidth`
)

export const createQueryMinMaxHeaderFromTemplate = curry((maxWidth, minWidth) =>
  replaceTokens(QUERY_MIN_MAX_TEMPLATE, {
    minWidth,
    maxWidth,
  })
)

export const createQueryFromTemplate = replaceTokens(QUERY_TEMPLATE)

export const createDeclarationFromTemplate = replaceTokens(DECLARATION_TEMPLATE)

export const createCSSFunctionFromTemplate = replaceTokens(
  CSS_FUNCTION_TEMPLATE
)
