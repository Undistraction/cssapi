import { lensPath, lensProp, prop } from 'ramda'
import FIELD_NAMES from '../const/config'

const {
  PROPERTIES,
  SCOPES,
  DATA,
  TRANSFORMERS,
  BREAKPOINTS,
  RESOLVE,
} = FIELD_NAMES

export const propData = prop(DATA)
export const lDataScopes = lensPath([DATA, SCOPES])
export const lData = lensProp(DATA)
export const propScopes = prop(SCOPES)
export const lProperties = lensProp(PROPERTIES)
export const lTransformers = lensProp(TRANSFORMERS)
export const lBreakpoints = lensProp(BREAKPOINTS)
export const lResolve = lensProp(RESOLVE)
