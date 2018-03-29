import { injectGlobal } from 'styled-components'
import api from './api'
import FONT from './const/fonts'
import FS from './const/fontStyle'
import FW_NAME from './const/fontWeightName'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    background-color: grey;
    ${api.fonts(FONT.MONSERRAT, FW_NAME.NORMAL, FS.NORMAL)}
  }
`
