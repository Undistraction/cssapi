import { both, when, compose, always } from 'ramda'
import { isString, isNotUndefined } from 'ramda-adjunct'
import { propFlipped } from '../utils/objects'
import { isNotMatch, isMatch } from '../utils/predicate'

const propOrSelf = (o, predicate) =>
  when(both(isString, predicate), propFlipped(o))

const keyToObjectValueTransformer = (config = {}, o) =>
  compose(
    when(
      always(isNotUndefined(config.exclude)),
      propOrSelf(o, isNotMatch(config.exclude))
    ),
    when(
      always(isNotUndefined(config.include)),
      propOrSelf(o, isMatch(config.include))
    )
  )

export default keyToObjectValueTransformer
