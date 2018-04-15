import { DIRECTIONS_LIST } from '../../const/expanders'
import { expandSubProps } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

const directionsExpander = () => (propName, style) =>
  expandSubProps(appendSubToProp, DIRECTIONS_LIST)(``, style)({})

export default directionsExpander
