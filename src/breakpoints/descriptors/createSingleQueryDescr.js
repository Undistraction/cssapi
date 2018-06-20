import { cond, either, T } from 'ramda'
import { hasNoModifier } from '../../objects/rangeItem'
import {
  modifierIsGtModifier,
  modifierIsLtModifier,
} from '../../utils/predicate'
import createAtQueryDescriptor from './createAtQueryDecriptor'
import renderGtQuery from './createGtQueryDescriptor'
import renderLtQuery from './createLtQueryDescriptor'

const createSingleQueryDescriptor = cond([
  [either(hasNoModifier, modifierIsGtModifier), () => renderGtQuery],
  [modifierIsLtModifier, () => renderLtQuery],
  [T, () => createAtQueryDescriptor],
])

export default createSingleQueryDescriptor
