import { divide, flip } from 'ramda'
import { isTrue } from 'ramda-adjunct'

const divideBy2 = flip(divide)(2)

const wholeLinesForFontSize = (minLeading, fontSize, baselineHeight) => {
  const lines = Math.ceil(fontSize / baselineHeight)
  const linesWithLeading =
    lines * baselineHeight - fontSize >= minLeading ? lines : lines + 1
  return linesWithLeading
}

const halfLinesForFontSize = (minLeading, fontSize, baselineHeight) => {
  const lines = Math.ceil(fontSize / divideBy2(baselineHeight))
  const linesWithLeading =
    lines * baselineHeight - fontSize >= minLeading ? lines : lines + 1
  return divideBy2(linesWithLeading)
}

// eslint-disable-next-line import/prefer-default-export
export const linesForFontsize = (
  minLeading,
  allowHalfLines,
  baselineHeight,
  fontSize
) => {
  const r = isTrue(allowHalfLines)
    ? halfLinesForFontSize(minLeading, fontSize, baselineHeight)
    : wholeLinesForFontSize(minLeading, fontSize, baselineHeight)

  return r
}

// export const baselineOffsetAtFontSize = (fontSize, offset) =>
//   fontSize / FONT_SIZE_FOR_OFFSET * offset
