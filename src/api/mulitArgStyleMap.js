import { F } from 'ramda'
import {
  isColorPartOfBorderOutlineProp,
  isRhythmUnitOrisValidNonZeroNumber,
  isRhythmUnitOrUnitlessNumberGt5,
  isColorPartOfBackgroundColor,
  isColorPartOfGradient,
  isGradient,
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
  backgroundPosition: {
    position: isRhythmUnitOrisValidNonZeroNumber,
  },
  backgroundImage: {
    color: isColorPartOfBackgroundColor,
    gradient: isGradient,
  },
  gradient: {
    color: isColorPartOfGradient,
  },
})

export default multiArgStyleMap
