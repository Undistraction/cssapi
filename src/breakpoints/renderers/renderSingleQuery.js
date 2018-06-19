import { cond, either, T } from 'ramda'
import { hasNoModifier } from '../../objects/range'
import {
  modifierIsGtModifier,
  modifierIsLtModifier,
} from '../../utils/predicate'
import renderAtQuery from './renderAtQuery'
import renderGtQuery from './renderGtQuery'
import renderLtQuery from './renderLtQuery'

const renderSingleQuery = cond([
  [either(hasNoModifier, modifierIsGtModifier), () => renderGtQuery],
  [modifierIsLtModifier, () => renderLtQuery],
  [T, () => renderAtQuery],
])

export default renderSingleQuery
