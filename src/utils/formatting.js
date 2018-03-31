import { compose, prepend, append, join, split, replace } from 'ramda'

export const joinWithSpace = join(` `)
export const joinWithComma = join(`,`)
export const joinWithHypen = join(`-`)
export const joinWithNoSpace = join(``)
export const joinWithDot = join(`.`)
export const joinWithNewline = join(`\n`)
export const splitOnWhitespace = split(/\s+/)
export const indentLines = replace(/^/gm, `  `)

export const wrapWith = (a, b = a) =>
  compose(joinWithNoSpace, prepend(a), append(b))

export const wrapWithSingleQuotes = wrapWith(`'`)
