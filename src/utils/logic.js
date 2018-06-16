import { when } from 'ramda'
import { isUndefined } from 'ramda-adjunct'

// eslint-disable-next-line import/prefer-default-export
export const whenIsUndefined = f => when(isUndefined, () => f())
