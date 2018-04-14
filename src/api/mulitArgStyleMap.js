import {
  isRhythmUnitOrisValidNonZeroNumber,
  isRhythmUnitOrUnitlessNumberGt5,
  isColorPartOfBackground,
  isGradient,
  isNameValueWithName,
} from '../utils/predicate'

const multiArgStyleMap = Object.freeze({
  border: {
    color: isNameValueWithName(`c`),
    width: isRhythmUnitOrisValidNonZeroNumber,
  },
  outline: {
    color: isNameValueWithName(`c`),
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
    gradient: isGradient,
    gradientName: isNameValueWithName(`g`),
    color: isNameValueWithName(`c`),
  },
  backgroundPosition: {
    position: isRhythmUnitOrisValidNonZeroNumber,
  },
  gradient: {
    color: isNameValueWithName(`c`),
  },
  boxShadow: {
    color: isNameValueWithName(`c`),
    length: isRhythmUnitOrisValidNonZeroNumber,
  },
})

export default multiArgStyleMap
