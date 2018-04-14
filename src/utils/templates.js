import { replaceToken, replaceTokens } from './formatting'
import {
  QUERY_HEADER_TEMPLATE,
  DECLARATION_TEMPLATE,
  CSS_FUNCTION_TEMPLATE,
  QUERY_TEMPLATE,
} from '../const/templates'

export const createQueryHeaderFromTemplate = replaceToken(
  QUERY_HEADER_TEMPLATE,
  `minWidth`
)

export const createQueryFromTemplate = replaceTokens(QUERY_TEMPLATE)

export const createDeclarationFromTemplate = replaceTokens(DECLARATION_TEMPLATE)

export const createCSSFunctionFromTemplate = replaceTokens(
  CSS_FUNCTION_TEMPLATE
)
