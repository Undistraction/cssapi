import { prop, compose, __, mergeDeepRight, over } from 'ramda'
import { reduceObjIndexed } from '../utils/objects'
import EXPANDER_MAP from './expanderMap'
import { lApi } from '../utils/config'

const expand = reduceObjIndexed(
  (api, [propName, expander]) =>
    compose(mergeDeepRight(api), expander)(propName, prop(propName, api)),
  __,
  EXPANDER_MAP
)

const expandStyles = over(lApi, expand)

export default expandStyles
