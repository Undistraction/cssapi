import React from 'react'
import styled from 'styled-components'

import api from '../styles/api'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${api({
    minWidth: 300,
    maxWidth: [`auto`, 1000, `initial`],
    padding: [0, `4ru`, 0],
    margin: [0, `0 auto`],
  })};
`

const AppHeader = styled.header`
  ${api({
    backgroundColor: `headerFooter`,
    borderRadius: [0, `1ru`, 0],
  })};
`

const AppFooter = styled.footer`
  text-align: center;
  ${api({
    padding: [`1ru`, `4ru`],
    backgroundColor: `headerFooter`,
    borderRadius: [0, `1ru`, 0],
    flexBasis: [`2ru`, `4ru`],
  })};
`

const AppTitle = styled.h1`
  ${api({
    padding: [[`1ru`, `2ru`], [`2ru`, `4ru`]],
  })};
`

const AppBody = styled.div`
  ${api({
    padding: [[`1ru`, `2ru`], [`2ru`, `4ru`]],
    display: `flex`,
    flexDirection: [`column`, `row`],
    flexGrow: 2,
    maxWidth: {
      large: 1200,
    },
    margin: {
      large: `0 auto`,
    },
  })};
`

const Primary = styled.main`
  ${api({
    paddingRight: [0, `3ru`],
  })};
`

const Secondary = styled.aside`
  ${api({
    flexBasis: [`auto`, `auto`, 200, 300],
    flexShrink: [`auto`, `auto`, 0],
    padding: `1ru`,
    backgroundColor: [`transparent`, `headerFooter`],
  })};
`

const PrimaryTitle = styled.h2``

const App = () => (
  <AppWrapper>
    <AppHeader>
      <AppTitle>Example: Without Theme</AppTitle>
    </AppHeader>
    <AppBody>
      <Primary>
        <PrimaryTitle>PrimaryTitle</PrimaryTitle>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          quis erat malesuada, lobortis leo eu, faucibus ante. Sed tempor
          tincidunt lectus, ac scelerisque justo tincidunt lobortis. Phasellus
          metus elit, porta vel sodales eu, euismod a libero. Duis sagittis,
          massa et dignissim eleifend, elit lorem luctus ligula, ut mattis ex
          dui non lacus. Nulla facilisi. Etiam et eros consequat, malesuada
          mauris at, mollis purus. Donec venenatis, enim vitae commodo
          consequat, arcu erat mollis leo, eget dapibus ligula lacus ut augue.
        </p>
        <p>
          Morbi in fringilla ligula, eget congue diam. Ut gravida quam sit amet
          diam malesuada malesuada. Donec nibh odio, convallis at velit eu,
          lobortis rutrum massa. Fusce cursus, turpis nec mattis lacinia, nibh
          ligula mollis turpis, a aliquam mauris tellus eget arcu. Mauris ut
          quam ac neque luctus eleifend quis eu arcu. Nunc hendrerit eget leo ut
          faucibus. Aenean et quam vel arcu vulputate rutrum at ac turpis.
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          quis erat malesuada, lobortis leo eu, faucibus ante. Sed tempor
          tincidunt lectus, ac scelerisque justo tincidunt lobortis. Phasellus
          metus elit, porta vel sodales eu, euismod a libero. Duis sagittis,
          massa et dignissim eleifend, elit lorem luctus ligula, ut mattis ex
          dui non lacus. Nulla facilisi. Etiam et eros consequat, malesuada
          mauris at, mollis purus. Donec venenatis, enim vitae commodo
          consequat, arcu erat mollis leo, eget dapibus ligula lacus ut augue.
        </p>
        <p>
          Morbi in fringilla ligula, eget congue diam. Ut gravida quam sit amet
          diam malesuada malesuada. Donec nibh odio, convallis at velit eu,
          lobortis rutrum massa. Fusce cursus, turpis nec mattis lacinia, nibh
          ligula mollis turpis, a aliquam mauris tellus eget arcu. Mauris ut
          quam ac neque luctus eleifend quis eu arcu. Nunc hendrerit eget leo ut
          faucibus. Aenean et quam vel arcu vulputate rutrum at ac turpis.
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
      </Primary>
      <Secondary>
        <ul>
          <li>Alpha</li>
          <li>Bravo</li>
          <li>Charlie</li>
          <li>Delta</li>
          <li>Echo</li>
          <li>Foxtrot</li>
          <li>Gamma</li>
          <li>Hotel</li>
        </ul>
      </Secondary>
    </AppBody>
    <AppFooter>CSSApi</AppFooter>
  </AppWrapper>
)

export default App
