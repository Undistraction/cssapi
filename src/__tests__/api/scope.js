import configureCssApi from '../../index'
import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
} from '../testHelpers/fixtures/generic'
import { scope } from '../../utils/scope'

const scaleData = {
  scale: {
    small: 12,
    medium: 16,
    large: 22,
  },
}

const scopedScale = {
  ...scaleData,
  scopes: [
    {
      resolve: [breakpoint1, breakpoint2],
      data: {
        scale: {
          small: 16,
          medium: 22,
          large: 28,
        },
      },
    },
  ],
}

describe.skip(`scope`, () => {
  const breakpointMap = [
    [breakpoint1, `25em`],
    [breakpoint2, `50em`],
    [breakpoint3, `75em`],
  ]
  const cssApi = configureCssApi({
    breakpoints: breakpointMap,
    data: {
      ...scopedScale,
    },
  })

  it(`scopes the value`, () => {
    expect(cssApi.padding(scope(`1ru`, [`small`]))).toEqual(`
      @media 
    `)
  })
})
