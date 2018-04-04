import { both, when } from 'ramda'
import { isString } from 'ramda-adjunct'
import { propFlipped } from '../utils/objects'
import { isNotMatch, isMatch } from '../utils/predicate'

const keyToObjectValueTransformer = (config = {}, o) => v => {
  if (config.exclude) {
    return when(both(isString, isNotMatch(config.exclude)), propFlipped(o))(v)
  }

  if (config.include) {
    return when(both(isString, isMatch(config.include)), propFlipped(o))(v)
  }

  return v
}

export default keyToObjectValueTransformer
