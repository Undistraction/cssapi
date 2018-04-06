import { transformMatchingParts } from '../utils/transformers'
import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderOneToManyProps from '../renderers/renderMultiProp'
import {
  isNumberString,
  isColorPartOfBorderProp,
  isColorPartOfOutlineProp,
} from '../utils/predicate'
import renderDirectionProps from '../renderers/renderDirectionProps'
import renderHorizontalDirectionProps from '../renderers/renderHorizontalDirectionProps'
import renderVerticalDirectionProps from '../renderers/renderVerticalDirectionProps'
import lengthToRemsTransformer from '../transformers/lengthToRemsTransformer'
import colorNameToColorValueTransformer from '../transformers/colorNameToColorValueTransformer'
import rhythmUnitsToLengthTransformer from '../transformers/rhythmUnitsToLengthTransformer'

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
    padding: {
      transformers: lengthToRemsTransformer,
    },
    margin: {
      transformers: lengthToRemsTransformer,
    },
    border: {
      transformers: [
        [isNumberString, lengthToRemsTransformer],
        [isColorPartOfBorderProp, colorNameToColorValueTransformer],
      ],
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
    lineHeight: {
      transformers: rhythmUnitsToLengthTransformer,
    },
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
