import { append, flatten, last, pipe, zip } from 'ramda'
import { createScope } from '../objects/scope'
import { joinWithNoSpace } from './formatting'

// Note: When called as a template-literal, the argument to a function will be
// wrapped in an array, so we need to extract it using head.
// eslint-disable-next-line import/prefer-default-export
export const scope = (strings, ...values) =>
  pipe(zip, append(last(strings)), flatten, joinWithNoSpace, createScope)(
    strings,
    values
  )
