import { replaceToken, replaceTokens } from './formatting';
import { QUERY_TEMPLATE, DECLARATION_TEMPLATE } from '../const/templates';

export const createQueryStringFromTemplate = replaceToken(QUERY_TEMPLATE, `minWidth`)

export const createDeclarationFromTemplate = replaceTokens(DECLARATION_TEMPLATE)

