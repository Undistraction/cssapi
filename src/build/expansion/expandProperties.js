import { compose, mergeDeepRight, over, prop, __ } from 'ramda'
import { lProperties } from '../../objects/config'
import { reduceObjIndexed } from '../../utils/objects'
import EXPANDER_MAP from './propertyExpanderMap'

const expand = reduceObjIndexed(
  (properties, [propName, expander]) =>
    compose(mergeDeepRight(properties), expander)(
      propName,
      prop(propName, properties)
    ),
  __,
  EXPANDER_MAP
)

const expandProperties = over(lProperties, expand)

export default expandProperties
