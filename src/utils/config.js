import { lensProp, prop } from 'ramda'
import { CONFIG_FIELD_NAMES } from '../const'

const { API, SCOPES, DATA, TRANSFORMERS } = CONFIG_FIELD_NAMES

export const lData = lensProp(DATA)
export const pScopes = prop(SCOPES)
export const lApi = lensProp(API)
export const lTransformers = lensProp(TRANSFORMERS)
