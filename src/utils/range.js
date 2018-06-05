import { complement, has, indexOf, prop } from 'ramda'
import { LT_MODIFIER } from '../const/breakpoints'

export const propOffset = prop(`offset`)

// eslint-disable-next-line import/prefer-default-export
export const hasNoModifier = complement(has(`modifier`))

export const isRange = value => indexOf(LT_MODIFIER, value) > 1
