import unitlessNumberToLengthTransformer from '../transformers/unitlessNumberToLengthTransformer'
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
import { LENGTH_UNITS, REGEXP_COLOR } from '../const'
import defaultProvider from '../providers/defaultProvider'

// -----------------------------------------------------------------------------
// 1. Providers
// -----------------------------------------------------------------------------

const colorProvider = defaultProvider(`color`, REGEXP_COLOR)

// -----------------------------------------------------------------------------
// 2. Configure Helpers
// -----------------------------------------------------------------------------

const unitlessNumberToRemsTransformer = unitlessNumberToLengthTransformer(
  LENGTH_UNITS.REM
)

// -----------------------------------------------------------------------------
// 3. Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  api: {
    // -------------------------------------------------------------------------
    // Box Model
    // -------------------------------------------------------------------------

    // Padding

    padding: {
      transformers: transformAllPartsWith(unitlessNumberToRemsTransformer),
    },
    paddingTop: {
      transformers: unitlessNumberToRemsTransformer,
    },
    paddingRight: {
      transformers: unitlessNumberToRemsTransformer,
    },
    paddingLeft: {
      transformers: unitlessNumberToRemsTransformer,
    },
    paddingBottom: {
      transformers: unitlessNumberToRemsTransformer,
    },

    // Margin

    margin: {
      transformers: transformAllPartsWith(unitlessNumberToRemsTransformer),
    },
    marginTop: {
      transformers: unitlessNumberToRemsTransformer,
    },
    marginRight: {
      transformers: unitlessNumberToRemsTransformer,
    },
    marginLeft: {
      transformers: unitlessNumberToRemsTransformer,
    },
    marginBottom: {
      transformers: unitlessNumberToRemsTransformer,
    },

    // Border

    border: {
      transformers: transformMatchingParts([
        [isNumberString, unitlessNumberToRemsTransformer],
        [isColorPartOfBorderProp, colorProvider],
      ]),
    },
    borderTop: {
      transformers: transformMatchingParts([
        [isNumberString, unitlessNumberToRemsTransformer],
      ]),
    },
    borderRight: {
      transformers: transformMatchingParts([
        [isNumberString, unitlessNumberToRemsTransformer],
      ]),
    },
    borderLeft: {
      transformers: transformMatchingParts([
        [isNumberString, unitlessNumberToRemsTransformer],
      ]),
    },
    borderBottom: {
      transformers: transformMatchingParts([
        [isNumberString, unitlessNumberToRemsTransformer],
      ]),
    },
    borderWidth: {
      transformers: unitlessNumberToRemsTransformer,
    },
    borderTopWidth: {
      transformers: unitlessNumberToRemsTransformer,
    },
    borderRightWidth: {
      transformers: unitlessNumberToRemsTransformer,
    },
    borderBottomWidth: {
      transformers: unitlessNumberToRemsTransformer,
    },
    borderLeftWidth: {
      transformers: unitlessNumberToRemsTransformer,
    },
    borderColor: colorProvider,
    borderTopColor: colorProvider,
    borderRightColor: colorProvider,
    borderBottomColor: colorProvider,
    borderLeftColor: colorProvider,
    borderStyle: {},
    borderTopStyle: {},
    borderRightStyle: {},
    borderBottomStyle: {},
    borderLeftStyle: {},
    borderSpacing: {
      transformers: unitlessNumberToRemsTransformer,
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
      transformers: colorProvider,
    },

    // -------------------------------------------------------------------------
    // Color / Visibility
    // -------------------------------------------------------------------------

    opacity: {
      transformers: percentageStringToRatioTransformer,
    },
    color: {
      transformers: colorProvider,
    },
    visibility: {},

    // -------------------------------------------------------------------------
    // Layout
    // -------------------------------------------------------------------------

    display: {},
    position: {},
    top: {
      transformers: unitlessNumberToRemsTransformer,
    },
    right: {
      transformers: unitlessNumberToRemsTransformer,
    },
    bottom: {
      transformers: unitlessNumberToRemsTransformer,
    },
    left: {
      transformers: unitlessNumberToRemsTransformer,
    },
    width: {
      transformers: unitlessNumberToRemsTransformer,
    },
    minWidth: {
      transformers: unitlessNumberToRemsTransformer,
    },
    maxWidth: {
      transformers: unitlessNumberToRemsTransformer,
    },
    height: {
      transformers: unitlessNumberToRemsTransformer,
    },
    minHeight: {
      transformers: unitlessNumberToRemsTransformer,
    },
    maxHeight: {
      transformers: unitlessNumberToRemsTransformer,
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

    borderRadius: {
      transformers: unitlessNumberToRemsTransformer,
    },
    zIndex: {},
    zoom: {},
    overflow: {},
    overflowX: {},
    overflowY: {},
    outline: {
      transformers: transformMatchingParts([
        [isNumberString, unitlessNumberToRemsTransformer],
        [isColorPartOfOutlineProp, colorProvider],
      ]),
    },
    outlineColor: {
      transformers: colorProvider,
    },
    outlineOffset: unitlessNumberToRemsTransformer,
    outlineStyle: {},
    outlineWidth: unitlessNumberToRemsTransformer,

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    paddingH: {
      transformers: unitlessNumberToRemsTransformer,
      renderer: renderOneToManyProps([`paddingRight`, `paddingLeft`]),
    },

    paddingV: {
      transformers: unitlessNumberToRemsTransformer,
      renderer: renderOneToManyProps([`paddingTop`, `paddingBottom`]),
    },

    marginH: {
      transformers: unitlessNumberToRemsTransformer,
      renderer: renderOneToManyProps([`marginRight`, `marginLeft`]),
    },

    marginV: {
      transformers: unitlessNumberToRemsTransformer,
      renderer: renderOneToManyProps([`marginTop`, `marginBottom`]),
    },

    offset: {
      transformers: unitlessNumberToRemsTransformer,
      renderer: renderDirectionProps,
    },

    // TODO: Add offsetV and offsetH
    // TODO: Add fillV and fillH
  },
}

export default defaultConfig
