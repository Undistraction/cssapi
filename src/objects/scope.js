import { has, objOf, prop } from 'ramda'
import FIELDS from '../const/scope'

const { SCOPE } = FIELDS

export const createScope = objOf(SCOPE)

export const propScope = prop(SCOPE)

export const hasScope = has(SCOPE)
