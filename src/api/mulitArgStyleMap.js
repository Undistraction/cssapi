import { F } from 'ramda'
import {
  isColorPartOfBorderOutlineProp,
  isRhythmUnitOrisValidNonZeroNumber,
  isRhythmUnitOrUnitlessNumberGt5,
} from '../utils/predicate'

const multiArgStyleMap = Object.freeze({
  border: {
    color: isColorPartOfBorderOutlineProp,
    style: F,
    width: isRhythmUnitOrisValidNonZeroNumber,
  },
  outline: {
    color: isColorPartOfBorderOutlineProp,
    style: F,
    width: isRhythmUnitOrisValidNonZeroNumber,
  },
  flex: {
    basis: isRhythmUnitOrUnitlessNumberGt5,
  },
})

export default multiArgStyleMap
