import { isUndefined, isArray } from 'ramda-adjunct'
import { T, pipe, when, multiply, __, unless } from 'ramda'
import transformer from '../transformer'
import { linesForFontsize } from '../../utils/baseline'
import { transformValue } from '../../utils/transformers'
import keysToObjectValuesResolver from '../../resolvers/keysToObjectValuesResolver'
import { unitedDimensionToUnitlessPixelValue } from '../../utils/converters'
import keyToValueResolver from '../../resolvers/keyToValueResolver'
import { splitOnUnnestedWhitespace } from '../../utils/formatting'

const rhythmUnitsToRemsTransformer = fontSizeToLengthTransformer =>
  transformer(T, (value, data, breakpointName) => {
    const [lineHeight, minLeading, allowHalfLines] = keysToObjectValuesResolver(
      `baseline`,
      [`lineHeight`, `minLeading`, `allowHalfLines`]
    )(data, breakpointName)

    const baseFontSize = keyToValueResolver(`baseFontSize`)(
      value,
      data,
      breakpointName
    )

    const [fontSize, lines] = unless(isArray, splitOnUnnestedWhitespace)(value)

    const transformedFontSize = transformValue(
      fontSizeToLengthTransformer,
      fontSize,
      data,
      breakpointName
    )
    const fontSizeUnitlessPx = unitedDimensionToUnitlessPixelValue(
      transformedFontSize,
      baseFontSize
    )

    const transformedLines = pipe(
      when(isUndefined, () =>
        linesForFontsize(
          minLeading,
          allowHalfLines,
          lineHeight,
          fontSizeUnitlessPx
        )
      ),
      multiply(lineHeight),
      transformValue(fontSizeToLengthTransformer, __, data, breakpointName)
    )(lines)

    return [transformedFontSize, transformedLines]
  })

export default rhythmUnitsToRemsTransformer
