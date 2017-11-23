import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { lighten } from 'polished'
import { Link } from 'react-router-dom'

export const Button = styled.button`
  background: rgb(198, 156, 109);
  border: none;
  padding: 10px 40px;
  margin: 10px 0;
  white-space: nowrap;
  font-size: 16px;
  color: ${lighten(0.1, '#000000')};
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${darken(0.1, 'rgb(198, 156, 109)')};
  }

  &:active {
    background: ${darken(0.2, 'rgb(198, 156, 109)')};
  }
`
export const LinkButton = Button.withComponent(Link)
