import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderOneToManyProps from '../renderers/renderMultiProp'
import renderDirectionProps from '../renderers/renderDirectionProps'
import renderHorizontalDirectionProps from '../renderers/renderHorizontalDirectionProps'
import renderVerticalDirectionProps from '../renderers/renderVerticalDirectionProps'
import lengthToRemsTransformer from '../transformers/lengthToRemsTransformer'
import colorNameToColorValueTransformer from '../transformers/colorNameToColorValueTransformer'

import fontNameToFontFamilyTransformer from '../transformers/fontNameToFontFamilyTransformer'
import fontSizeToRemsTransformer from '../transformers/fontSizeToRemsTransformer'
import gradientTransformer from '../transformers/gradientTransformer'

// -----------------------------------------------------------------------------
// Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  breakpoints: [],
  data: {
    rhythm: 10,
    color: {},
    scale: {},
  },
  api: {
    // -------------------------------------------------------------------------
    // Box Model
    // -------------------------------------------------------------------------

    padding: {
      transformers: lengthToRemsTransformer,
    },
    margin: {
      transformers: lengthToRemsTransformer,
    },
    border: {
      transformers: {
        width: lengthToRemsTransformer,
        color: colorNameToColorValueTransformer,
      },
    },
    borderWidth: {
      transformers: lengthToRemsTransformer,
    },
    borderColor: colorNameToColorValueTransformer,
    borderStyle: {},
    borderSpacing: {
      transformers: lengthToRemsTransformer,
    },
    borderRadius: {
      transformers: lengthToRemsTransformer,
    },

    // -------------------------------------------------------------------------
    // Outline
    // -------------------------------------------------------------------------

    outline: {
      transformers: {
        width: lengthToRemsTransformer,
        color: colorNameToColorValueTransformer,
      },
    },
    outlineColor: {
      transformers: colorNameToColorValueTransformer,
    },
    outlineOffset: {
      transformers: lengthToRemsTransformer,
    },
    outlineStyle: {},
    outlineWidth: {
      transformers: lengthToRemsTransformer,
    },

    // -------------------------------------------------------------------------
    // Text
    // -------------------------------------------------------------------------

    fontFamily: {
      transformers: fontNameToFontFamilyTransformer,
    },
    fontSize: {
      transformers: fontSizeToRemsTransformer,
    },
    fontWeight: {},
    fontStretch: {},
    fontStyle: {},
    lineHeight: {
      transformers: lengthToRemsTransformer,
    },
    textAlign: {},
    letterSpacing: {
      transformers: lengthToRemsTransformer,
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
        color: colorNameToColorValueTransformer,
        gradient: gradientTransformer,
      },
    },

    backgroundAttachment: {},

    backgroundClip: {},

    backgroundColor: {
      transformers: colorNameToColorValueTransformer,
    },

    backgroundImage: {
      transformers: {
        color: colorNameToColorValueTransformer,
        gradient: gradientTransformer,
      },
    },

    backgroundOrigin: {},

    backgroundPosition: {
      transformers: {
        position: lengthToRemsTransformer,
      },
    },

    backgroundRepeat: {},

    backgroundSize: {
      transformers: lengthToRemsTransformer,
    },

    // -------------------------------------------------------------------------
    // Color / Visibility
    // -------------------------------------------------------------------------

    opacity: {
      transformers: percentageStringToRatioTransformer,
    },
    color: {
      transformers: colorNameToColorValueTransformer,
    },
    visibility: {},

    // -------------------------------------------------------------------------
    // Layout
    // -------------------------------------------------------------------------

    display: {},
    position: {},
    directions: {
      transformers: lengthToRemsTransformer,
    },
    width: {
      transformers: lengthToRemsTransformer,
    },
    height: {
      transformers: lengthToRemsTransformer,
    },

    // -------------------------------------------------------------------------
    // Flexbox
    // -------------------------------------------------------------------------

    flex: {
      transformers: {
        basis: lengthToRemsTransformer,
      },
    },
    flexDirection: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    alignSelf: {},
    flexBasis: {
      transformers: lengthToRemsTransformer,
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

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    paddingH: {
      transformers: lengthToRemsTransformer,
      renderer: renderOneToManyProps([`paddingRight`, `paddingLeft`]),
    },

    paddingV: {
      transformers: lengthToRemsTransformer,
      renderer: renderOneToManyProps([`paddingTop`, `paddingBottom`]),
    },

    marginH: {
      transformers: lengthToRemsTransformer,
      renderer: renderOneToManyProps([`marginRight`, `marginLeft`]),
    },

    marginV: {
      transformers: lengthToRemsTransformer,
      renderer: renderOneToManyProps([`marginTop`, `marginBottom`]),
    },

    offset: {
      transformers: lengthToRemsTransformer,
      renderer: renderDirectionProps,
    },

    offsetV: {
      transformers: lengthToRemsTransformer,
      renderer: renderVerticalDirectionProps,
    },

    offsetH: {
      transformers: lengthToRemsTransformer,
      renderer: renderHorizontalDirectionProps,
    },
  },
}

export default defaultConfig
