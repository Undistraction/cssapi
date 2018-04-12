import { values } from 'ramda'

export const DIRECTIONS = Object.freeze({
  TOP: `top`,
  RIGHT: `right`,
  BOTTOM: `bottom`,
  LEFT: `left`,
})

export const DIRECTIONS_LIST = values(DIRECTIONS)

export const DIRECTIONS_LIST_HORIZONTAL = [DIRECTIONS.RIGHT, DIRECTIONS.LEFT]

export const DIRECTIONS_LIST_VERTICAL = [DIRECTIONS.TOP, DIRECTIONS.BOTTOM]

export const MIN_MAX = {
  MIN: `min`,
  MAX: `max`,
}

export const MIN_MAX_LIST = values(MIN_MAX)

export const AXES = {
  X: `x`,
  Y: `y`,
}

export const AXES_LIST = values(AXES)