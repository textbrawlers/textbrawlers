import { media } from 'client/util/styleUtils.js'
import styled from 'styled-components'

const width = '800px'

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

  ${media.ltMedium`
    flex: none;

    &:not(:first-child) {
      margin-top: 20px;
    }
  `};
`

export const OuterBox = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: ${width};

  ${media.ltMedium`
    flex-direction: column;
  `};
`

export const BoxBanner = styled.div`
  max-width: calc(${width} - 30px);
  margin: 0 auto;
  background: hsla(112, 69%, 73%, 1);
  padding: 5px 15px;
`
