import dataMapLookupProvider from '../providers/dataMapLookupProvider'
import { REGEXP_COLOR } from '../const'

const colorNameToColorValueTransformer = dataMapLookupProvider(`color`, {
  exclude: REGEXP_COLOR,
})

export default colorNameToColorValueTransformer
