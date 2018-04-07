import { stubObj, stubString } from 'ramda-adjunct'
import { DIRECTIONS_LIST } from '../../const'
import { expandSubProps } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

const directionsExpander = ({ mainWrapper, toProp = appendSubToProp } = {}) => (
  propName,
  style
) =>
  expandSubProps(toProp, DIRECTIONS_LIST)(stubString(), style, mainWrapper)(
    stubObj
  )

export default directionsExpander
