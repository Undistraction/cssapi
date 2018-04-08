import scaleDegreeToFontSizeTransformer from './scaleDegreeToFontsizeTransformer'
import lengthToRemsTransformer from './lengthToRemsTransformer'

const fontSizeToRemsTransformer = [
  scaleDegreeToFontSizeTransformer,
  ...lengthToRemsTransformer,
]

export default fontSizeToRemsTransformer
