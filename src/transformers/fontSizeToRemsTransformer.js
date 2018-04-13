import scaleDegreeToFontSizeTransformer from './scaleDegreeToFontsizeTransformer'
import lengthTransformer from './lengthTransformer'

const fontSizeToRemsTransformer = [
  scaleDegreeToFontSizeTransformer,
  ...lengthTransformer,
]

export default fontSizeToRemsTransformer
