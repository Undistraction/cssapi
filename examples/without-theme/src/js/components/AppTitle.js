import styled from 'styled-components'
import cssApi from '../styles/api'

const AppTitle = styled.h1`
  ${cssApi.padding([10, 20], [20, 40])};
  ${cssApi.marginTop(40, 80)};
  ${cssApi.border(`2 solid black`, `4 solid red`)};
`

export default AppTitle
