import configureCSSAPI from '../../../../../src/index'

const config = {
  breakpoints: [[`medium`, 500], [`large`, 1100], [`xLarge`, 1300]],
  data: {
    color: {
      lightGrey: `#DDD`,
      black: `#0D0D0D`,
      midGrey: `#777`,
      background: `#{lightGrey}`,
      text: `#{black}`,
      headerFooter: `#{midGrey}`,
    },
    font: {
      default: `Montserrat, Helvetica, Sans-Serif`,
      title: `Raleway, Helvetica, Sans-Serif`,
    },
    rhythm: 15,
  },
}

const cssAPI = configureCSSAPI(config)

export default cssAPI
