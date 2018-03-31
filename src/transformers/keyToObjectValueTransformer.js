import { compose, both, match, when, isEmpty } from 'ramda'
import { isString } from 'ramda-adjunct'
import { propFlipped } from '../utils/objects'

const notMatch = regExp => compose(isEmpty, match(regExp))

const keyToObjectValueTransformer = (excludeRegExp, o) =>
  when(both(isString, notMatch(excludeRegExp)), propFlipped(o))

export default keyToObjectValueTransformer
