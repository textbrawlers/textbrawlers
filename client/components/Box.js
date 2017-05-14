import { media } from 'client/util/styleUtils.js'
import styled from 'styled-components'

export const BoxHeader = styled.div`
  background: #dddddd;
  border-bottom: 1px solid #000;
  font-weight: bold;
  padding: 5px 15px;
`

export const BoxContent = styled.div`
  flex: 1;
  padding: 15px;
`

export const Box = styled.div`
  background: #ededed;
  display: flex;
  flex: 1;
  flex-direction: column;

  &:not(:last-child) > ${BoxContent} {
    border-right: 1px solid #ddd;
  }
`

export const OuterBox = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 800px;

  ${media.ltMedium`
    flex-direction: column;
  `}
`

