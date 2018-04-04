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
import { REGEXP_COLOR, REGEXP_RHYTHM_UNITS } from '../const'
import defaultProvider from '../providers/defaultProvider'
import unitlessNumberToRemsTransformer from '../transformers/unitlessNumberToRemsTransformer'

// -----------------------------------------------------------------------------
// 1. Providers
// -----------------------------------------------------------------------------

const colorProvider = defaultProvider(`color`, { exclude: REGEXP_COLOR })
const rhythmProvider = defaultProvider(`rhythm`, {
  include: REGEXP_RHYTHM_UNITS,
})

// -----------------------------------------------------------------------------
// 2. Transformers
// -----------------------------------------------------------------------------

const lengthTransformer = unitlessNumberToRemsTransformer

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
      transformers: transformAllPartsWith(lengthTransformer),
    },
    paddingTop: {
      transformers: lengthTransformer,
    },
    paddingRight: {
      transformers: lengthTransformer,
    },
    paddingLeft: {
      transformers: lengthTransformer,
    },
    paddingBottom: {
      transformers: lengthTransformer,
    },

    // Margin

    margin: {
      transformers: transformAllPartsWith(lengthTransformer),
    },
    marginTop: {
      transformers: lengthTransformer,
    },
    marginRight: {
      transformers: lengthTransformer,
    },
    marginLeft: {
      transformers: lengthTransformer,
    },
    marginBottom: {
      transformers: lengthTransformer,
    },

    // Border

    border: {
      transformers: transformMatchingParts([
        [isNumberString, lengthTransformer],
        [isColorPartOfBorderProp, colorProvider],
      ]),
    },
    borderTop: {
      transformers: transformMatchingParts([
        [isNumberString, lengthTransformer],
      ]),
    },
    borderRight: {
      transformers: transformMatchingParts([
        [isNumberString, lengthTransformer],
      ]),
    },
    borderLeft: {
      transformers: transformMatchingParts([
        [isNumberString, lengthTransformer],
      ]),
    },
    borderBottom: {
      transformers: transformMatchingParts([
        [isNumberString, lengthTransformer],
      ]),
    },
    borderWidth: {
      transformers: lengthTransformer,
    },
    borderTopWidth: {
      transformers: lengthTransformer,
    },
    borderRightWidth: {
      transformers: lengthTransformer,
    },
    borderBottomWidth: {
      transformers: lengthTransformer,
    },
    borderLeftWidth: {
      transformers: lengthTransformer,
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
      transformers: lengthTransformer,
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
      transformers: lengthTransformer,
    },
    right: {
      transformers: lengthTransformer,
    },
    bottom: {
      transformers: lengthTransformer,
    },
    left: {
      transformers: lengthTransformer,
    },
    width: {
      transformers: lengthTransformer,
    },
    minWidth: {
      transformers: lengthTransformer,
    },
    maxWidth: {
      transformers: lengthTransformer,
    },
    height: {
      transformers: lengthTransformer,
    },
    minHeight: {
      transformers: lengthTransformer,
    },
    maxHeight: {
      transformers: lengthTransformer,
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
      transformers: lengthTransformer,
    },
    zIndex: {},
    zoom: {},
    overflow: {},
    overflowX: {},
    overflowY: {},
    outline: {
      transformers: transformMatchingParts([
        [isNumberString, lengthTransformer],
        [isColorPartOfOutlineProp, colorProvider],
      ]),
    },
    outlineColor: {
      transformers: colorProvider,
    },
    outlineOffset: lengthTransformer,
    outlineStyle: {},
    outlineWidth: lengthTransformer,

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    paddingH: {
      transformers: lengthTransformer,
      renderer: renderOneToManyProps([`paddingRight`, `paddingLeft`]),
    },

    paddingV: {
      transformers: lengthTransformer,
      renderer: renderOneToManyProps([`paddingTop`, `paddingBottom`]),
    },

    marginH: {
      transformers: lengthTransformer,
      renderer: renderOneToManyProps([`marginRight`, `marginLeft`]),
    },

    marginV: {
      transformers: lengthTransformer,
      renderer: renderOneToManyProps([`marginTop`, `marginBottom`]),
    },

    offset: {
      transformers: lengthTransformer,
      renderer: renderDirectionProps,
    },

    // TODO: Add offsetV and offsetH
    // TODO: Add fillV and fillH
  },
}

export default defaultConfig
