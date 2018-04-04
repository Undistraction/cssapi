import unitlessNumberToLengthTransformer from '../transformers/unitlessNumberToLengthTransformer'
import { repeatedProp, detectProps } from '../utils/transformers'
import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderOneToManyProps from '../renderers/renderMultiProp'
import { isNumberString } from '../utils/predicate'
import renderDirectionProps from '../renderers/renderDirectionProps'
import { LENGTH_UNITS } from '../const'

// -----------------------------------------------------------------------------
// 1. Configure Helpers
// -----------------------------------------------------------------------------

const unitlessNumberToRemsTransformer = unitlessNumberToLengthTransformer(
  LENGTH_UNITS.REM
)

// -----------------------------------------------------------------------------
// 2. Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  api: {
    // -------------------------------------------------------------------------
    // Box Model
    // -------------------------------------------------------------------------

    // Padding

    padding: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    paddingTop: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    paddingRight: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    paddingLeft: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    paddingBottom: {
      transformers: [unitlessNumberToRemsTransformer],
    },

    // Margin

    margin: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    marginTop: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    marginRight: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    marginLeft: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    marginBottom: {
      transformers: [unitlessNumberToRemsTransformer],
    },

    // Border

    border: {
      transformers: [
        detectProps([[isNumberString, unitlessNumberToRemsTransformer]]),
      ],
    },
    borderTop: {
      transformers: [
        detectProps([[isNumberString, unitlessNumberToRemsTransformer]]),
      ],
    },
    borderRight: {
      transformers: [
        detectProps([[isNumberString, unitlessNumberToRemsTransformer]]),
      ],
    },
    borderLeft: {
      transformers: [
        detectProps([[isNumberString, unitlessNumberToRemsTransformer]]),
      ],
    },
    borderBottom: {
      transformers: [
        detectProps([[isNumberString, unitlessNumberToRemsTransformer]]),
      ],
    },
    borderWidth: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    borderTopWidth: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    borderRightWidth: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    borderBottomWidth: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    borderLeftWidth: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    borderColor: {},
    borderTopColor: {},
    borderRightColor: {},
    borderBottomColor: {},
    borderLeftColor: {},
    borderStyle: {},
    borderTopStyle: {},
    borderRightStyle: {},
    borderBottomStyle: {},
    borderLeftStyle: {},
    borderSpacing: {
      transformers: [unitlessNumberToRemsTransformer],
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

    backgroundColor: {},
    background: {},

    // -------------------------------------------------------------------------
    // Color / Visibility
    // -------------------------------------------------------------------------

    opacity: {
      transformers: [percentageStringToRatioTransformer],
    },
    color: {},
    visibility: {},

    // -------------------------------------------------------------------------
    // Layout
    // -------------------------------------------------------------------------

    display: {},
    position: {},
    top: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    right: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    bottom: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    left: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    width: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    minWidth: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    maxWidth: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    height: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    minHeight: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    maxHeight: {
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
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
      transformers: [repeatedProp(unitlessNumberToRemsTransformer)],
    },
    boxShadow: {},
    zIndex: {},
    overflow: {},
    overflowX: {},
    overflowY: {},
    outline: {},
    outlineColor: {},
    outlineOffset: {},
    outlineStyle: {},
    outlineWidth: {},
    zoom: {},

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    paddingH: {
      transformers: [unitlessNumberToRemsTransformer],
      renderer: renderOneToManyProps([`paddingRight`, `paddingLeft`]),
    },

    paddingV: {
      transformers: [unitlessNumberToRemsTransformer],
      renderer: renderOneToManyProps([`paddingTop`, `paddingBottom`]),
    },

    marginH: {
      transformers: [unitlessNumberToRemsTransformer],
      renderer: renderOneToManyProps([`marginRight`, `marginLeft`]),
    },

    marginV: {
      transformers: [unitlessNumberToRemsTransformer],
      renderer: renderOneToManyProps([`marginTop`, `marginBottom`]),
    },

    offset: {
      transformers: [unitlessNumberToRemsTransformer],
      renderer: renderDirectionProps,
    },

    // TODO: Add offsetV and offsetH
    // TODO: Add fillV and fillH
  },
}

export default defaultConfig
