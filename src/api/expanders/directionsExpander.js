import { stubObj, stubString } from 'ramda-adjunct'
import { DIRECTIONS_LIST } from '../../const'
import { expandSubProps } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

const directionsExpander = (wrapper, toProp = appendSubToProp) => (
  propName,
  style
) =>
  expandSubProps(toProp, DIRECTIONS_LIST)(stubString(), style, wrapper)(stubObj)

export default directionsExpander
