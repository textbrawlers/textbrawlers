import React from 'react'
import styled from 'styled-components'

const Logo = styled.img.attrs({
  src: 'client/img/textbrawlers.svg',
})`
    height:100px;
    margin: 10px 0;
    
    ${props =>
      props.small &&
      `
    height: 50px;
    `};
    
    ${props =>
      props.center &&
      `
    margin: 10px auto;
    `};
`

export default Logo
