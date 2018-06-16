import { lensPath, lensProp, prop } from 'ramda'
import { CONFIG_FIELD_NAMES } from '../const/config'

const {
  PROPERTIES,
  SCOPES,
  DATA,
  TRANSFORMERS,
  BREAKPOINTS,
  RESOLVE,
} = CONFIG_FIELD_NAMES

export const lDataScopes = lensPath([DATA, SCOPES])
export const lData = lensProp(DATA)
export const pScopes = prop(SCOPES)
export const lProperties = lensProp(PROPERTIES)
export const lTransformers = lensProp(TRANSFORMERS)
export const lBreakpoints = lensProp(BREAKPOINTS)
export const lResolve = lensProp(RESOLVE)
