import {
  transformAllPartsWith,
  transformMatchingParts,
} from '../utils/transformers'
import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderOneToManyProps from '../renderers/renderMultiProp'
import {
  isNumberString,
  isColorPartOfBorderProp,
  isColorPartOfOutlineProp,
} from '../utils/predicate'
import renderDirectionProps from '../renderers/renderDirectionProps'
import renderHorizontalDirections from '../renderers/renderHorizontalDirections'
import renderVerticalDirections from '../renderers/renderVerticalDirections'
import lengthToRemsTransformer from '../transformers/lengthToRemsTransformer'
import colorNameToColorValueTransformer from '../transformers/colorNameToColorValueTransformer'

// -----------------------------------------------------------------------------
// Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  breakpoints: [],
  data: {
    rhythm: 10,
  },
  api: {
    // -------------------------------------------------------------------------
    // Box Model
    // -------------------------------------------------------------------------

    // Padding
    padding: {
      transformers: transformAllPartsWith(lengthToRemsTransformer),
    },
    paddingTop: {
      transformers: lengthToRemsTransformer,
    },
    paddingRight: {
      transformers: lengthToRemsTransformer,
    },
    paddingLeft: {
      transformers: lengthToRemsTransformer,
    },
    paddingBottom: {
      transformers: lengthToRemsTransformer,
    },

    // Margin
    margin: {
      transformers: transformAllPartsWith(lengthToRemsTransformer),
    },
    marginTop: {
      transformers: lengthToRemsTransformer,
    },
    marginRight: {
      transformers: lengthToRemsTransformer,
    },
    marginLeft: {
      transformers: lengthToRemsTransformer,
    },
    marginBottom: {
      transformers: lengthToRemsTransformer,
    },

    // Border
    border: {
      transformers: transformMatchingParts([
        [isNumberString, lengthToRemsTransformer],
        [isColorPartOfBorderProp, colorNameToColorValueTransformer],
      ]),
    },
    borderTop: {
      transformers: transformMatchingParts([
        [isNumberString, lengthToRemsTransformer],
      ]),
    },
    borderRight: {
      transformers: transformMatchingParts([
        [isNumberString, lengthToRemsTransformer],
      ]),
    },
    borderLeft: {
      transformers: transformMatchingParts([
        [isNumberString, lengthToRemsTransformer],
      ]),
    },
    borderBottom: {
      transformers: transformMatchingParts([
        [isNumberString, lengthToRemsTransformer],
      ]),
    },
    borderWidth: {
      transformers: lengthToRemsTransformer,
    },
    borderTopWidth: {
      transformers: lengthToRemsTransformer,
    },
    borderRightWidth: {
      transformers: lengthToRemsTransformer,
    },
    borderBottomWidth: {
      transformers: lengthToRemsTransformer,
    },
    borderLeftWidth: {
      transformers: lengthToRemsTransformer,
    },
    borderColor: transformAllPartsWith(colorNameToColorValueTransformer),
    borderTopColor: colorNameToColorValueTransformer,
    borderRightColor: colorNameToColorValueTransformer,
    borderBottomColor: colorNameToColorValueTransformer,
    borderLeftColor: colorNameToColorValueTransformer,
    borderStyle: {},
    borderTopStyle: {},
    borderRightStyle: {},
    borderBottomStyle: {},
    borderLeftStyle: {},
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
      transformers: transformMatchingParts([
        [isNumberString, lengthToRemsTransformer],
        [isColorPartOfOutlineProp, colorNameToColorValueTransformer],
      ]),
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

    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    fontStyle: {},
    lineHeight: {},
    textAlign: {},
    letterSpacing: {},
    wordWrap: {},

    // -------------------------------------------------------------------------
    // Background
    // -------------------------------------------------------------------------

    backgroundColor: {
      transformers: colorNameToColorValueTransformer,
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
    top: {
      transformers: lengthToRemsTransformer,
    },
    right: {
      transformers: lengthToRemsTransformer,
    },
    bottom: {
      transformers: lengthToRemsTransformer,
    },
    left: {
      transformers: lengthToRemsTransformer,
    },
    width: {
      transformers: lengthToRemsTransformer,
    },
    minWidth: {
      transformers: lengthToRemsTransformer,
    },
    maxWidth: {
      transformers: lengthToRemsTransformer,
    },
    height: {
      transformers: lengthToRemsTransformer,
    },
    minHeight: {
      transformers: lengthToRemsTransformer,
    },
    maxHeight: {
      transformers: lengthToRemsTransformer,
    },

    // -------------------------------------------------------------------------
    // Flexbox
    // -------------------------------------------------------------------------

    flex: {},
    flexDirection: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    alignSelf: {},
    flexBasix: {},
    flexShrink: {},
    flexGrow: {},
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
    overflowX: {},
    overflowY: {},

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
      renderer: renderVerticalDirections,
    },

    offsetH: {
      transformers: lengthToRemsTransformer,
      renderer: renderHorizontalDirections,
    },
  },
}

export default defaultConfig
