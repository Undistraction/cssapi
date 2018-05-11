import { append, flatten, last, objOf, pipe, zip } from 'ramda'
import { SCOPE } from '../const/scope'
import { joinWithNoSpace } from './formatting'

// Note: When called as a template-literal, a the argument to a function will be
// wrapped in an array, so we need to extract it using head.
// eslint-disable-next-line import/prefer-default-export
export const scope = (strings, ...values) =>
  pipe(zip, append(last(strings)), flatten, joinWithNoSpace, objOf(SCOPE))(
    strings,
    values
  )
