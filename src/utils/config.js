import { lensProp, prop, lensPath } from 'ramda'
import { CONFIG_FIELD_NAMES } from '../const/config'

const { API, SCOPES, DATA, TRANSFORMERS, BREAKPOINTS } = CONFIG_FIELD_NAMES

export const lDataScopes = lensPath([DATA, SCOPES])
export const lData = lensProp(DATA)
export const pScopes = prop(SCOPES)
export const lApi = lensProp(API)
export const lTransformers = lensProp(TRANSFORMERS)
export const lBreakpoints = lensProp(BREAKPOINTS)
