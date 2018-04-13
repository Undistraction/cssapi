import scaleDegreeToFontSizeTransformer from './scaleDegreeToFontsizeTransformer'
import lengthTransformer from './lengthTransformer'

const fontSizeToLengthTransformer = [
  scaleDegreeToFontSizeTransformer,
  ...lengthTransformer,
]

export default fontSizeToLengthTransformer
