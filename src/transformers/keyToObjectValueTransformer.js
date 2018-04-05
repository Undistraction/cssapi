import { both, when, always } from 'ramda'
import { isString, isNotUndefined } from 'ramda-adjunct'
import { propFlipped } from '../utils/objects'
import { isNotMatch, isMatch } from '../utils/predicate'
import { condDefault } from '../utils/functions'

const propOrSelf = (o, predicate) =>
  when(both(isString, predicate), propFlipped(o))

const keyToObjectValueTransformer = (o, config = {}) =>
  condDefault([
    [
      always(isNotUndefined(config.exclude)),
      propOrSelf(o, isNotMatch(config.exclude)),
    ],
    [
      always(isNotUndefined(config.include)),
      propOrSelf(o, isMatch(config.include)),
    ],
  ])

export default keyToObjectValueTransformer
