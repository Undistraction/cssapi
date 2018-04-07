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
    font: {
      default: `Montserrat, Helvetica, Sans-Serif`,
      title: `Raleway, Helvetica, Sans-Serif`,
    },
  },
}

const cssAPI = configureCSSAPI(config)

export default cssAPI
