import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { lighten } from 'polished'

const Button = styled.button`
  background: rgb(198, 156, 109);
  border: none;
  padding: 10px 40px;
  margin: 10px 0;
  white-space: nowrap;
  font-size: 16px;
  color: ${lighten(0.1, '#000000')};

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${darken(0.1, 'rgb(198, 156, 109)')};
  }
`

export default Button
