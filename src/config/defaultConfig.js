import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderMultiProp from '../renderers/renderMultiProp'
import renderBaseline from '../renderers/renderBaseline'
import renderDirectionProps from '../renderers/renderDirectionProps'
import renderHorizontalDirectionProps from '../renderers/renderHorizontalDirectionProps'
import renderVerticalDirectionProps from '../renderers/renderVerticalDirectionProps'
import lengthTransformer from '../transformers/lengthTransformer'
import colorNameToColorTransformer from '../transformers/colorNameToColorTransformer'
import gradientNameToGradientTransformer from '../transformers/gradientNameToGradientTransformer'
import fontNameToFontFamilyTransformer from '../transformers/fontNameToFontFamilyTransformer'
import fontSizeToLengthTransformer from '../transformers/fontSizeToLengthTransformer'
import gradientTransformer from '../transformers/gradientTransformer'
import baselineTransformer from '../transformers/composite/baselineTransformer'
import { LENGTH_UNITS } from '../const/units'

// -----------------------------------------------------------------------------
// Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  breakpoints: [],
  dataAliases: {
    c: `color`,
    g: `gradient`,
    s: `scale`,
    b: `boxShadow`,
  },
  data: {
    baseFontSize: 16, // Font size of your page's root element
    rhythm: 20, // Unit of rhythm for use in layout
    baseline: {
      lineHeight: 20, // Baseline height
      minLeading: 2, // Minimum remaining leading before line or half-line added
      allowHalfLines: true, // Allow half-lines to be used in baseline calc
    },
    lengthUnit: LENGTH_UNITS.REM, // | LENGTH_UNITS.PX | LENGTH_UNITS.EM
    color: {},
    scale: {},
    gradient: {},
    boxShadow: {},
  },
  api: {
    // -------------------------------------------------------------------------
    // Box Model
    // -------------------------------------------------------------------------

    padding: {
      transformers: lengthTransformer,
    },
    margin: {
      transformers: lengthTransformer,
    },
    border: {
      transformers: {
        width: lengthTransformer,
        color: colorNameToColorTransformer,
      },
    },
    borderWidth: {
      transformers: lengthTransformer,
    },
    borderColor: colorNameToColorTransformer,
    borderStyle: {},
    borderSpacing: {
      transformers: lengthTransformer,
    },
    borderRadius: {
      transformers: lengthTransformer,
    },

    // -------------------------------------------------------------------------
    // Outline
    // -------------------------------------------------------------------------

    outline: {
      transformers: {
        width: lengthTransformer,
        color: colorNameToColorTransformer,
      },
    },
    outlineColor: {
      transformers: colorNameToColorTransformer,
    },
    outlineOffset: {
      transformers: lengthTransformer,
    },
    outlineStyle: {},
    outlineWidth: {
      transformers: lengthTransformer,
    },

    // -------------------------------------------------------------------------
    // Text
    // -------------------------------------------------------------------------

    fontFamily: {
      transformers: fontNameToFontFamilyTransformer,
    },
    fontSize: {
      transformers: fontSizeToLengthTransformer,
    },
    fontWeight: {},
    fontStretch: {},
    fontStyle: {},
    lineHeight: {
      transformers: lengthTransformer,
    },
    textAlign: {},
    letterSpacing: {
      transformers: lengthTransformer,
    },
    wordWrap: {},
    wordSpacing: {},
    textDecoration: {},
    whiteSpace: {},

    // -------------------------------------------------------------------------
    // Background
    // -------------------------------------------------------------------------

    background: {
      transformers: {
        color: colorNameToColorTransformer,
        gradient: gradientTransformer,
      },
    },

    backgroundAttachment: {},

    backgroundClip: {},

    backgroundColor: {
      transformers: colorNameToColorTransformer,
    },

    backgroundImage: {
      transformers: {
        color: colorNameToColorTransformer,
        gradientName: gradientNameToGradientTransformer,
        gradient: gradientTransformer,
      },
    },

    backgroundOrigin: {},

    backgroundPosition: {
      transformers: {
        position: lengthTransformer,
      },
    },

    backgroundRepeat: {},

    backgroundSize: {
      transformers: lengthTransformer,
    },

    // -------------------------------------------------------------------------
    // Color / Visibility
    // -------------------------------------------------------------------------

    opacity: {
      transformers: percentageStringToRatioTransformer,
    },
    color: {
      transformers: colorNameToColorTransformer,
    },
    visibility: {},

    // -------------------------------------------------------------------------
    // Layout
    // -------------------------------------------------------------------------

    display: {},
    position: {},
    directions: {
      transformers: lengthTransformer,
    },
    width: {
      transformers: lengthTransformer,
    },
    height: {
      transformers: lengthTransformer,
    },

    // -------------------------------------------------------------------------
    // Flexbox
    // -------------------------------------------------------------------------

    flex: {
      transformers: {
        basis: lengthTransformer,
      },
    },
    flexDirection: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    alignSelf: {},
    flexBasis: {
      transformers: lengthTransformer,
    },
    flexShrink: {}, // Doesn't support <length> values
    flexGrow: {}, // Doesn't support <length> values
    flexWrap: {},
    order: {},

    // -------------------------------------------------------------------------
    // Tables
    // -------------------------------------------------------------------------

    verticalAlign: {},

    // -------------------------------------------------------------------------
    // Misc
    // -------------------------------------------------------------------------

    zIndex: {},
    zoom: {},
    overflow: {},
    boxShadow: {
      transformers: {
        color: colorNameToColorTransformer,
        length: lengthTransformer,
      },
    },
    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    paddingH: {
      transformers: lengthTransformer,
      renderer: renderMultiProp([`paddingRight`, `paddingLeft`]),
    },

    paddingV: {
      transformers: lengthTransformer,
      renderer: renderMultiProp([`paddingTop`, `paddingBottom`]),
    },

    marginH: {
      transformers: lengthTransformer,
      renderer: renderMultiProp([`marginRight`, `marginLeft`]),
    },

    marginV: {
      transformers: lengthTransformer,
      renderer: renderMultiProp([`marginTop`, `marginBottom`]),
    },

    offset: {
      transformers: lengthTransformer,
      renderer: renderDirectionProps,
    },

    offsetV: {
      transformers: lengthTransformer,
      renderer: renderVerticalDirectionProps,
    },

    offsetH: {
      transformers: lengthTransformer,
      renderer: renderHorizontalDirectionProps,
    },

    baseline: {
      transformers: baselineTransformer,
      renderer: renderBaseline,
    },
  },
}

export default defaultConfig
