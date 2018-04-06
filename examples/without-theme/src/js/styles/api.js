import configureCSSAPI from '../../../../../src/index'

const config = {
  breakpoints: [[`medium`, `30em`], [`large`, `60em`], [`xLarge`, `80rem`]],
  data: {
    color: {
      background: `grey`,
      text: `black`,
      border: `white`,
      headerFooter: `dimGrey`,
    },
  },
}

const cssAPI = configureCSSAPI(config)

export default cssAPI
