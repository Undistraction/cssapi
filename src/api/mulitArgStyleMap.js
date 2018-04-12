import { F } from 'ramda'
import {
  isColorPartOfBorderOutlineProp,
  isRhythmUnitOrisValidNonZeroNumber,
  isRhythmUnitOrUnitlessNumberGt5,
  isColorPartOfBackgroundColor,
  isColorPartOfBackground,
  isColorPartOfGradient,
  isGradient,
  isColorPartOfBoxShadow,
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
  background: {
    color: isColorPartOfBackground,
    gradient: isGradient,
  },
  backgroundImage: {
    color: isColorPartOfBackgroundColor,
    gradient: isGradient,
  },
  backgroundPosition: {
    position: isRhythmUnitOrisValidNonZeroNumber,
  },
  gradient: {
    color: isColorPartOfGradient,
  },
  boxShadow: {
    color: isColorPartOfBoxShadow,
    length: isRhythmUnitOrisValidNonZeroNumber,
  },
})

export default multiArgStyleMap
