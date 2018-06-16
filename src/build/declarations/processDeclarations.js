import { apply, isNil, pipe, prop, unnest, when } from 'ramda'
import { appendFlipped, ensureArray } from 'ramda-adjunct'
import { invalidPropertyError, throwAPIError } from '../../errors'
import { reduceObjIndexed } from '../../utils/objects'

const processDeclaration = processors => (acc, [name, args]) => {
  const processor = prop(name, processors)
  when(isNil, () => throwAPIError(invalidPropertyError(name)))(processor)
  return pipe(ensureArray, apply(processor), appendFlipped(acc))(args)
}

const processDeclarations = processors =>
  pipe(reduceObjIndexed(processDeclaration(processors), []), unnest)

export default processDeclarations
