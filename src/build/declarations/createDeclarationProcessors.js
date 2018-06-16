import { assoc, pipe, __ } from 'ramda'
import resolveBreakpoints from '../../breakpoints/resolveBreakpoints'
import { reduceObjIndexed } from '../../utils/objects'
import createDeclarationProcessor from './createDeclarationProcessor'

const create = (breakpoints, name, data, style) =>
  pipe(
    resolveBreakpoints(breakpoints),
    createDeclarationProcessor(name, data, style)
  )

const createDeclarationProcessorReducer = (breakpoints, data) => (
  acc,
  [name, style]
) => pipe(create, assoc(name, __, acc))(breakpoints, name, data, style)

const createDeclarationProcessors = ({ breakpoints, data, properties }) =>
  reduceObjIndexed(
    createDeclarationProcessorReducer(breakpoints, data),
    {},
    properties
  )

export default createDeclarationProcessors
