import { keys } from 'ramda'

import STYLES from '../const/styles'
// import { compose, reduce, ifElse, has, prop, of, converge } from 'ramda';
// import { concatRight, appendFlipped, concatAll } from 'ramda-adjunct';
// import STYLES from '../const/styles'

// const expandSub = style => {
//   const a = []
//   converge(
//     concat
//     [
//       compose(
//         of,
//         prop(`name`)
//       ),
//       compose(
//         map()
//         prop(`sub`)
//       )
//     ]
//   )

// // eslint-disable-next-line import/prefer-default-export
// export const resolveStyles = reduce(
//   (acc, style) =>
//     compose(
//       concatRight(acc),
//       ifElse(has(`sub`), expandSubProps, compose(of, prop(`name`)))
//     )(style),
//   [],
//   STYLES
// )

// eslint-disable-next-line import/prefer-default-export
export const styleNames = keys(STYLES)
