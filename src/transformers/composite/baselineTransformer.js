import { multiply, pipe, T, unless } from 'ramda'
import { isArray } from 'ramda-adjunct'
import keysToObjectValuesResolver from '../../resolvers/keysToObjectValuesResolver'
import keyToValueResolver from '../../resolvers/keyToValueResolver'
import { linesForFontsize } from '../../utils/baseline'
import { unitedDimensionToUnitlessPixelValue } from '../../utils/converters'
import { splitOnUnnestedWhitespace } from '../../utils/formatting'
import { whenIsUndefined } from '../../utils/logic'
import { transformValue } from '../../utils/transformers'
import transformer from '../transformer'

const PROP = `baseline`
const KEYS = [`lineHeight`, `minLeading`, `allowHalfLines`]

const rhythmUnitsToRemsTransformer = fontSizeToLengthTransformer =>
  transformer(T, (value, data, breakpointName) => {
    const [lineHeight, minLeading, allowHalfLines] = keysToObjectValuesResolver(
      PROP,
      KEYS
    )(data, breakpointName)

    const baseFontSize = keyToValueResolver(`baseFontSize`)(
      value,
      data,
      breakpointName
    )

    const [fontSize, lines] = unless(isArray, splitOnUnnestedWhitespace)(value)

    const transformedFontSize = transformValue(
      fontSizeToLengthTransformer,
      data,
      breakpointName,
      fontSize
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
      transformValue(fontSizeToLengthTransformer, data, breakpointName)
    )(lines)

    return [transformedFontSize, transformedLines]
  })

export default rhythmUnitsToRemsTransformer
