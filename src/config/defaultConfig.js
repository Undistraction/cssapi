import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderMultiProp from '../renderers/renderMultiProp'
import renderBaseline from '../renderers/renderBaseline'
import renderDirectionProps from '../renderers/renderDirectionProps'
import renderHorizontalDirectionProps from '../renderers/renderHorizontalDirectionProps'
import renderVerticalDirectionProps from '../renderers/renderVerticalDirectionProps'
import lengthTransformers from '../transformers/lengthTransformers'
import gradientTransformer from '../transformers/gradientTransformer'
import baselineTransformer from '../transformers/composite/baselineTransformer'
import { LENGTH_UNITS } from '../const/units'
import dataLookupTransformer from '../transformers/dataLookupTransformer'

// -----------------------------------------------------------------------------
// Define Data Lookup Transformers
// -----------------------------------------------------------------------------

const colorNameToColorTransformer = dataLookupTransformer(`color`)
const gradientNameToGradientTransformer = dataLookupTransformer(`gradient`)
const fontNameToFontFamilyTransformer = dataLookupTransformer(`font`)
const scaleNameToFontSizeTransformer = dataLookupTransformer(`scale`)
const boxShadowNameToFontSizeTransformer = dataLookupTransformer(`boxShadow`)

// -----------------------------------------------------------------------------
// Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  breakpoints: [],
  data: {
    aliases: {
      c: `color`,
      g: `gradient`,
      s: `scale`,
      b: `boxShadow`,
    },
    lengthUnit: LENGTH_UNITS.REM, // | LENGTH_UNITS.PX | LENGTH_UNITS.EM
    baseFontSize: 16, // Font size of your page's root element
    rhythm: 20, // Unit of rhythm for use in layout
    baseline: {
      lineHeight: 20, // Baseline height
      minLeading: 2, // Minimum remaining leading before line or half-line added
      allowHalfLines: true, // Allow half-lines to be used in baseline calc
    },
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
      transformers: lengthTransformers,
    },
    margin: {
      transformers: lengthTransformers,
    },
    border: {
      transformers: [lengthTransformers, colorNameToColorTransformer],
    },
    borderWidth: {
      transformers: lengthTransformers,
    },
    borderColor: {
      transformers: colorNameToColorTransformer,
    },
    borderStyle: {},
    borderSpacing: {
      transformers: lengthTransformers,
    },
    borderRadius: {
      transformers: lengthTransformers,
    },

    // -------------------------------------------------------------------------
    // Outline
    // -------------------------------------------------------------------------

    outline: {
      transformers: [lengthTransformers, colorNameToColorTransformer],
    },
    outlineColor: {
      transformers: colorNameToColorTransformer,
    },
    outlineOffset: {
      transformers: lengthTransformers,
    },
    outlineStyle: {},
    outlineWidth: {
      transformers: lengthTransformers,
    },

    // -------------------------------------------------------------------------
    // Text
    // -------------------------------------------------------------------------

    fontFamily: {
      transformers: fontNameToFontFamilyTransformer,
    },
    fontSize: {
      transformers: [scaleNameToFontSizeTransformer, lengthTransformers],
    },
    fontWeight: {},
    fontStretch: {},
    fontStyle: {},
    lineHeight: {
      transformers: lengthTransformers,
    },
    textAlign: {},
    letterSpacing: {
      transformers: lengthTransformers,
    },
    wordWrap: {},
    wordSpacing: {},
    textDecoration: {},
    whiteSpace: {},

    // -------------------------------------------------------------------------
    // Background
    // -------------------------------------------------------------------------

    background: {
      transformers: [
        colorNameToColorTransformer,
        gradientTransformer(colorNameToColorTransformer),
      ],
    },

    backgroundAttachment: {},

    backgroundClip: {},

    backgroundColor: {
      transformers: colorNameToColorTransformer,
    },

    backgroundImage: {
      transformers: [
        colorNameToColorTransformer,
        gradientNameToGradientTransformer,
        gradientTransformer(colorNameToColorTransformer),
      ],
    },

    backgroundOrigin: {},

    backgroundPosition: {
      transformers: lengthTransformers,
    },

    backgroundRepeat: {},

    backgroundSize: {
      transformers: lengthTransformers,
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
      transformers: lengthTransformers,
    },
    width: {
      transformers: lengthTransformers,
    },
    height: {
      transformers: lengthTransformers,
    },

    // -------------------------------------------------------------------------
    // Flexbox
    // -------------------------------------------------------------------------

    flex: {
      transformers: lengthTransformers,
    },
    flexDirection: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    alignSelf: {},
    flexBasis: {
      transformers: lengthTransformers,
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
      transformers: [
        boxShadowNameToFontSizeTransformer,
        colorNameToColorTransformer,
        lengthTransformers,
      ],
    },
    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    paddingH: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([`paddingRight`, `paddingLeft`]),
    },

    paddingV: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([`paddingTop`, `paddingBottom`]),
    },

    marginH: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([`marginRight`, `marginLeft`]),
    },

    marginV: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([`marginTop`, `marginBottom`]),
    },

    offset: {
      transformers: lengthTransformers,
      renderer: renderDirectionProps,
    },

    offsetV: {
      transformers: lengthTransformers,
      renderer: renderVerticalDirectionProps,
    },

    offsetH: {
      transformers: lengthTransformers,
      renderer: renderHorizontalDirectionProps,
    },

    baseline: {
      transformers: baselineTransformer([
        scaleNameToFontSizeTransformer,
        lengthTransformers,
      ]),
      renderer: renderBaseline,
    },
  },
}

export default defaultConfig
