import { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import api from './api'

injectGlobal`
  ${styledNormalize}

  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica, Arial, Sans-Serif;
    ${api({ backgroundColor: [`transparent`, `background`] })}
  }

  h1, 
  h2, 
  h3 {
    margin: 0;
    padding: 0;
  }
`
