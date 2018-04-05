import { compose, prepend, append, join, split, replace } from 'ramda'
import { REGEXP_START_OF_LINE, REGEXP_WHITESPACE } from '../const'

const NEWLINE = `\n`
const SPACE = ` `
const COMMA = `,`
const HYPHEN = `-`
const FULL_STOP = `.`
const SINGLE_QUOTE = `'`

export const joinWithSpace = join(SPACE)
export const joinWithComma = join(COMMA)
export const joinWithHypen = join(HYPHEN)
export const joinWithNoSpace = join(``)
export const joinWithDot = join(FULL_STOP)
export const joinWithNewline = join(NEWLINE)

export const wrapWith = (a, b = a) =>
  compose(joinWithNoSpace, prepend(a), append(b))

export const wrapWithSingleQuotes = wrapWith(SINGLE_QUOTE)

export const splitOnWhitespace = split(REGEXP_WHITESPACE)

export const indentLines = replace(REGEXP_START_OF_LINE, `  `)

export const printObj = JSON.stringify
