import { pipe, zip } from 'ramda'
import { DIRECTIONS_LIST } from '../../../const/expanders'
import { joinWithNewline } from '../../../utils/formatting'
import renderDeclarations from './renderDeclarations'

const renderDirectionProps = (name, value) => {
  const right = value[1] || value[0]
  const bottom = value[2] || value[0]
  const left = value[3] || value[1] || value[0]
  const directionValues = [value[0], right, bottom, left]

  return pipe(zip(DIRECTIONS_LIST), renderDeclarations, joinWithNewline)(
    directionValues
  )
}
export default renderDirectionProps
