import { isTrue } from 'ramda-adjunct'
import { divideBy2 } from './numbers'

const wholeLinesForFontSize = (minLeading, fontSize, baselineHeight) => {
  const lines = Math.ceil(fontSize / baselineHeight)
  return lines * baselineHeight - fontSize >= minLeading ? lines : lines + 1
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
