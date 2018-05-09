import { values } from 'ramda'

export const DIRECTIONS = Object.freeze({
  TOP: `top`,
  RIGHT: `right`,
  BOTTOM: `bottom`,
  LEFT: `left`,
})

export const CORNERS = Object.freeze({
  TOP_RIGHT: `topRight`,
  BOTTOM_RIGHT: `bottomRight`,
  BOTTOM_LEFT: `bottomLeft`,
  TOP_LEFT: `topLeft`,
})

export const DIRECTIONS_LIST = values(DIRECTIONS)
export const CORNERS_LIST = values(CORNERS)

export const DIRECTIONS_LIST_HORIZONTAL = [DIRECTIONS.LEFT, DIRECTIONS.RIGHT]

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
