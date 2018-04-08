import { replaceTokens, replaceToken } from '../../utils/formatting'

describe(`replaceToken`, () => {
  it(`replaces a single token`, () => {
    const template = `alpha #{bravo}`
    expect(replaceToken(template, `bravo`, `charlie`)).toEqual(`alpha charlie`)
  })

  it(`replaces a multiple identical tokens`, () => {
    const template = `alpha #{bravo} #{bravo}`
    expect(replaceToken(template, `bravo`, `charlie`)).toEqual(
      `alpha charlie charlie`
    )
  })
})

describe(`replaceTokens`, () => {
  describe(`with object`, () => {
    it(`replaces a single token`, () => {
      const template = `alpha #{bravo}`
      expect(replaceTokens(template, { bravo: `charlie` })).toEqual(
        `alpha charlie`
      )
    })

    it(`replaces a multiple identical tokens`, () => {
      const template = `alpha #{bravo} #{bravo}`
      expect(replaceTokens(template, { bravo: `charlie` })).toEqual(
        `alpha charlie charlie`
      )
    })

    it(`replaces a multiple different tokens`, () => {
      const template = `alpha #{bravo} #{delta}`
      expect(
        replaceTokens(template, { bravo: `charlie`, delta: `echo` })
      ).toEqual(`alpha charlie echo`)
    })

    it(`handles additional values`, () => {
      const template = `alpha #{bravo} #{delta}`
      expect(
        replaceTokens(template, {
          bravo: `charlie`,
          delta: `echo`,
          foxtrot: `gamma`,
        })
      ).toEqual(`alpha charlie echo`)
    })
  })

  describe(`with array`, () => {
    it(`replaces all tokens`, () => {
      const template = `alpha #{1} #{2}`
      expect(replaceTokens(template, [`bravo`, `charlie`])).toEqual(
        `alpha bravo charlie`
      )
    })

    it(`handles addtional values`, () => {
      const template = `alpha #{1} #{2}`
      expect(replaceTokens(template, [`bravo`, `charlie`, `delta`])).toEqual(
        `alpha bravo charlie`
      )
    })
  })
})
