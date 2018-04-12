import {
  compose,
  prepend,
  append,
  join,
  split,
  replace,
  over,
  lensIndex,
  toUpper,
  converge,
  head,
  map,
  tail,
  reverse,
  when,
  flatten,
  insert,
  curry,
  pipe,
  assoc,
  inc,
} from 'ramda'
import {
  list,
  compact,
  isPlainObj,
  isArray,
  reduceIndexed,
} from 'ramda-adjunct'
import {
  REGEXP_START_OF_LINE,
  REGEXP_WHITESPACE,
  REGEXP_CAPITAL_LETTERS,
  REGEXP_UNNESTED_COMMA,
} from '../const/regexp'
import { isLengthGt } from './predicate'
import { condDefault } from './functions'
import { reduceObjIndexed } from './objects'

const NEWLINE = `\n`
const SPACE = ` `
const COMMA = `,`
const HYPHEN = `-`
const FULL_STOP = `.`
const SINGLE_QUOTE = `'`

export const joinWithSpace = join(SPACE)
export const joinWithComma = join(COMMA)
export const joinWithCommaSpace = join(`${COMMA}${SPACE}`)
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

export const firstToUpper = compose(
  joinWithNoSpace,
  over(lensIndex(0), toUpper)
)

const toToken = v => new RegExp(`#{(${v})}`, `g`)

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

export const splitCamelcase = compose(
  split(` `),
  replace(REGEXP_CAPITAL_LETTERS, ` $1`)
)

export const appendSubToProp = compose(
  joinWithNoSpace,
  flatten,
  when(isLengthGt(1), converge(list, [head, compose(map(firstToUpper), tail)])),
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

export const splitOnUnnestedComma = split(REGEXP_UNNESTED_COMMA)

export const splitOnComma = split(COMMA)
