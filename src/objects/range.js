import { complement, has, prop } from 'ramda'
import FIELD_NAMES from '../const/range'

const { OFFSET, MODIFIER } = FIELD_NAMES

export const propOffset = prop(OFFSET)

export const propModifier = prop(MODIFIER)

export const hasModifier = has(MODIFIER)

export const hasNoModifier = complement(hasModifier)
