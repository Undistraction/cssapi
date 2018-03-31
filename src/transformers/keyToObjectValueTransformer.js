import { both, when } from 'ramda'
import { isString } from 'ramda-adjunct'
import { propFlipped } from '../utils/objects'
import { isNotMatch } from '../utils/predicate'

const keyToObjectValueTransformer = (excludeRegExp, o) =>
  when(both(isString, isNotMatch(excludeRegExp)), propFlipped(o))

export default keyToObjectValueTransformer
