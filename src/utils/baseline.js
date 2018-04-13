import { divide, flip } from 'ramda'
import { isTrue } from 'ramda-adjunct'

const divideBy2 = flip(divide)(2)

const wholeLinesForFontSize = (minLeading, fontSize, baselineHeight) => {
  const lines = Math.ceil(fontSize / baselineHeight)
  const linesWithLeading =
    lines * baselineHeight - fontSize >= minLeading ? lines : lines + 1
  return linesWithLeading
}

// eslint-disable-next-line import/prefer-default-export
export const linesForFontsize = (
  minLeading,
  allowHalfLines,
  baselineHeight,
  fontSize
) =>
  isTrue(allowHalfLines)
    ? divideBy2(
        wholeLinesForFontSize(minLeading, fontSize, divideBy2(baselineHeight))
      )
    : wholeLinesForFontSize(minLeading, fontSize, baselineHeight)
