import dasherize from 'dasherize'
import {
  append,
  assoc,
  compose,
  converge,
  curry,
  flatten,
  head,
  inc,
  insert,
  join,
  lensIndex,
  map,
  nth,
  over,
  pipe,
  prepend,
  replace,
  reverse,
  split,
  tail,
  toUpper,
  trim,
  when,
} from 'ramda'
import {
  compact,
  isArray,
  isPlainObj,
  lengthGt,
  list,
  reduceIndexed,
} from 'ramda-adjunct'
import {
  RE_ARGUMENTS_OF_CSS_FUNCTION,
  RE_CAPITAL_LETTERS,
  RE_START_OF_LINE,
  RE_UNNESTED_COMMA,
  RE_UNNESTED_WHITESPACE,
  RE_WHITESPACE,
} from '../const/regexp'
import { condDefault } from './functions'
import { reduceObjIndexed } from './objects'

// -----------------------------------------------------------------------------
// Chars
// -----------------------------------------------------------------------------

const NEWLINE = `\n`
const DOUBLE_NEWLINE = `${NEWLINE}${NEWLINE}`
const SPACE = ` `
const COMMA = `,`
const COLON = `:`
const HYPHEN = `-`
const FULL_STOP = `.`
const SINGLE_QUOTE = `'`
const PIPE = `|`
const COMMA_SPACE = `${COMMA}${SPACE}`

// -----------------------------------------------------------------------------
// Create
// -----------------------------------------------------------------------------

const toToken = v => new RegExp(`#{(${v})}`, `g`)

// -----------------------------------------------------------------------------
// Print
// -----------------------------------------------------------------------------

export const printObj = JSON.stringify

// -----------------------------------------------------------------------------
// Indent
// -----------------------------------------------------------------------------

export const indentLines = replace(RE_START_OF_LINE, `  `)

// -----------------------------------------------------------------------------
// Join
// -----------------------------------------------------------------------------

export const joinWithSpace = join(SPACE)

export const joinWithComma = join(COMMA)

export const joinWithCommaSpace = join(COMMA_SPACE)

export const joinWithHypen = join(HYPHEN)

export const joinWithNoSpace = join(``)

export const joinWithDot = join(FULL_STOP)

export const joinWithNewline = join(NEWLINE)

export const joinWithPipe = join(PIPE)

export const joinWithDoubleNewlines = join(DOUBLE_NEWLINE)

// -----------------------------------------------------------------------------
// Case
// -----------------------------------------------------------------------------

export const firstToUpper = compose(
  joinWithNoSpace,
  over(lensIndex(0), toUpper)
)

export const toKebabCase = dasherize

// -----------------------------------------------------------------------------
// Split
// -----------------------------------------------------------------------------

export const splitOnWhitespace = split(RE_WHITESPACE)

export const splitOnUnnestedWhitespace = split(RE_UNNESTED_WHITESPACE)

export const splitOnUnnestedComma = split(RE_UNNESTED_COMMA)

export const splitOnComma = split(COMMA)

export const splitCamelcase = compose(
  split(` `),
  replace(RE_CAPITAL_LETTERS, ` $1`)
)

export const splitOnColon = split(COLON)

// -----------------------------------------------------------------------------
// Wrap
// -----------------------------------------------------------------------------

export const wrapWith = (a, b = a) =>
  compose(joinWithNoSpace, prepend(a), append(b), String)

export const wrapWithSingleQuotes = wrapWith(SINGLE_QUOTE)

// -----------------------------------------------------------------------------
// Replace
// -----------------------------------------------------------------------------

export const replaceToken = curry((template, tokenName, value) =>
  replace(toToken(tokenName), value, template)
)

const replaceWithMap = curry((template, valueMap) =>
  reduceObjIndexed(
    (acc, [key, value]) => replaceToken(acc, key, value),
    template,
    valueMap
  )
)

const replaceWithArray = curry((template, values) =>
  pipe(
    reduceIndexed((acc, v, idx) => assoc(inc(idx), v, acc), {}),
    replaceWithMap(template)
  )(values)
)

export const replaceTokens = curry((template, value) =>
  condDefault([
    [isArray, replaceWithArray(template)],
    [isPlainObj, replaceWithMap(template)],
  ])(value)
)

// -----------------------------------------------------------------------------
// Extract
// -----------------------------------------------------------------------------

export const extractFunctionArguments = value => {
  const parts = new RegExp(RE_ARGUMENTS_OF_CSS_FUNCTION).exec(value)
  return nth(1, parts)
}

// -----------------------------------------------------------------------------
// Insert / Append / Prepend
// -----------------------------------------------------------------------------

export const appendSubToProp = compose(
  joinWithNoSpace,
  flatten,
  when(lengthGt(1), converge(list, [head, compose(map(firstToUpper), tail)])),
  compact
)

export const prependSubToProp = compose(appendSubToProp, reverse)

export const insertSubIntoProp = compose(
  converge(compose(appendSubToProp, insert(1)), [
    head,
    compose(splitCamelcase, joinWithNoSpace, tail),
  ]),
  reverse
)

// -----------------------------------------------------------------------------
// Misc
// -----------------------------------------------------------------------------

export const trimAll = map(trim)
