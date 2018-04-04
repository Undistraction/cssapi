import unitlessNumberToLengthTransformer from '../transformers/unitlessNumberToLengthTransformer'
import { repeatedProp, detectProps } from '../utils/transformers'
import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderOneToManyProps from '../renderers/renderMultiProp'
import { isNumberString } from '../utils/predicate'
import renderDirectionProps from '../renderers/renderDirectionProps'
import { LENGTH_UNITS, REGEXP_COLOR } from '../const'
// import keyToObjectValueTransformer from '../transformers/keyToObjectValueTransformer'
import defaultProvider from '../providers/defaultProvider'

// -----------------------------------------------------------------------------
// 1. Providers
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 2. Configure Helpers
// -----------------------------------------------------------------------------

const unitlessNumberToRemsTransformer = unitlessNumberToLengthTransformer(
  LENGTH_UNITS.REM
)

// const colorNameToColorTransformer = keyToObjectValueTransformer(
//   REGEXP_COLOR,
//   data.color
// )

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
    color: {
      provider: defaultProvider(`color`, REGEXP_COLOR),
    },
    visibility: {},

    // -------------------------------------------------------------------------
    // Layout
    // -------------------------------------------------------------------------

    display: {},
    position: {},
    top: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    right: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    bottom: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    left: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    width: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    minWidth: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    maxWidth: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    height: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    minHeight: {
      transformers: [unitlessNumberToRemsTransformer],
    },
    maxHeight: {
      transformers: [unitlessNumberToRemsTransformer],
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
      transformers: [unitlessNumberToRemsTransformer],
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
