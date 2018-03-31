import styled from 'styled-components'
import api from '../styles/api'
import FONT from '../styles/const/fonts'
import FW from '../styles/const/fontWeight'

const { fonts, rBaseline, rMargin, rPadding } = api

const AppTitle = styled.h1`
  ${fonts.font(FONT.RALEWAY, FW.EXTRA_LIGHT)}
  ${rBaseline(20, 24)}
  ${rMargin([1, 3, 2], 2)}
  ${rPadding(1 / 2, 1)}
`

export default AppTitle
