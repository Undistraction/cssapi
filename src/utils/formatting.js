import { join, split, replace } from 'ramda'

export const joinWithSpace = join(` `)
export const joinWithNoSpace = join(``)
export const joinWithDot = join(`.`)
export const joinWithNewline = join(`\n`)
export const splitOnWhitespace = split(/\s+/)
export const indentLines = replace(/^/gm, `  `)
