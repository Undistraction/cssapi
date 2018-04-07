import React from 'react'
import styled from 'styled-components'

import api from '../styles/api'
import AppTitle from './AppTitle'

const Wrapper = styled.div`
  ${api({
    minWidth: 300,
    maxWidth: [`auto`, 1000],
    padding: [0, `4ru`],
    margin: [0, `0 auto`],
  })};
`

const Header = styled.header`
  ${api({
    backgroundColor: `headerFooter`,
    borderRadius: [0, `1ru`],
  })};
`

const App = () => (
  <Wrapper>
    <Header>
      <AppTitle>Example: Without Theme</AppTitle>
    </Header>
  </Wrapper>
)

export default App
