import { multiply, pipe, T, unless, __ } from 'ramda'
import { isArray } from 'ramda-adjunct'
import keysToObjectValuesResolver from '../../resolvers/keysToObjectValuesResolver'
import keyToValueResolver from '../../resolvers/keyToValueResolver'
import { linesForFontsize } from '../../utils/baseline'
import { unitedDimensionToUnitlessPixelValue } from '../../utils/converters'
import { splitOnUnnestedWhitespace } from '../../utils/formatting'
import { whenIsUndefined } from '../../utils/logic'
import { transformValue } from '../../utils/transformers'
import transformer from '../transformer'

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
      whenIsUndefined(() =>
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
