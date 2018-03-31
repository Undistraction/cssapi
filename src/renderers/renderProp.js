import { compose } from 'ramda'
import { ensureArray } from 'ramda-adjunct'
import dasherize from 'dasherize'
import { joinWithSpace } from '../utils/formatting'

const propRenderer = name => value =>
  `${dasherize(name)}: ${compose(joinWithSpace, ensureArray)(value)};`

export default propRenderer
