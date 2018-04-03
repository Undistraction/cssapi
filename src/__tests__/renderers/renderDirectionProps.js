import renderDirectionProps from '../../renderers/renderDirectionProps'

describe(`renderDirectionProps()`, () => {
  const renderer = renderDirectionProps
  it(`renders a single`, () => {
    const result = renderer(null, [`10px`])
    expect(result).toEqualMultiline(`
      top: 10px;
      right: 10px;
      bottom: 10px;
      left: 10px;
    `)
  })

  it(`renders two values`, () => {
    const result = renderer(null, [`10px`, `20px`])
    expect(result).toEqualMultiline(`
      top: 10px;
      right: 20px;
      bottom: 10px;
      left: 20px;
    `)
  })

  it(`renders three values`, () => {
    const result = renderer(null, [`10px`, `20px`, `5px`])
    expect(result).toEqualMultiline(`
      top: 10px;
      right: 20px;
      bottom: 5px;
      left: 20px;
    `)
  })

  it(`renders four values`, () => {
    const result = renderer(null, [`10px`, `20px`, `5px`, `2px`])
    expect(result).toEqualMultiline(`
      top: 10px;
      right: 20px;
      bottom: 5px;
      left: 2px;
    `)
  })
})
