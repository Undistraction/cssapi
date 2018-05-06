import { head, objOf, pipe } from 'ramda'
import { SCOPE } from '../const/scope'

// Note: When called as a template-literal, a the argument to a function will be
// wrapped in an array, so we need to extract it using head.
// eslint-disable-next-line import/prefer-default-export
export const scope = pipe(head, objOf(SCOPE))
