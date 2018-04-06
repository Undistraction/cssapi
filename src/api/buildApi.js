import { append, apply, pipe, __ } from 'ramda'
import { stubArray, ensureArray } from 'ramda-adjunct'
import { reduceObjIndexed } from '../utils/objects'
import { joinWithNewline } from '../utils/formatting'

const apiResolver = api => {
  const apiFunc = v => {
    const r = pipe(
      reduceObjIndexed(
        (acc, [name, args]) =>
          pipe(ensureArray, apply(api[name]), append(__, acc))(args),
        stubArray()
      ),
      joinWithNewline
    )(v)
    return r
  }

  for (const [key, value] of Object.entries(api)) {
    apiFunc[key] = value
  }

  return apiFunc
}

export default apiResolver
