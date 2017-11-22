import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const Textbox = styled.input`
  width: 300px;
  margin: 10px 0px;
  padding: 10px;
  outline: none;
  border: 1px solid #c8c8c8;
  font-size: 16px;

  &:focus {
    border: 1px solid ${darken(0.2, '#c8c8c8')};
  }
`

export default Textbox
