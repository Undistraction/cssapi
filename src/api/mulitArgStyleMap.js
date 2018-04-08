import { F } from 'ramda'
import {
  isColorPartOfBorderOutlineProp,
  isNumberString,
} from '../utils/predicate'

const multiArgStyleMap = Object.freeze({
  border: {
    color: isColorPartOfBorderOutlineProp,
    style: F,
    width: isNumberString,
  },
  outline: {
    color: isColorPartOfBorderOutlineProp,
    style: F,
    width: isNumberString,
  },
})

export default multiArgStyleMap
