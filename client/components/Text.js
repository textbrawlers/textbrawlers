import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const Text = styled.div`
  font-size: 16px;
  text-align: left;
  color: #000000;

  ${props =>
    props.small &&
    `
    font-size: 14px;
`};

  ${props =>
    props.faded &&
    `
  color: ${lighten(0.4, '#000000')};
`};

  ${props =>
    props.italic &&
    `
    font-style: italic;
`};

  ${props =>
    props.center &&
    `
    text-align:center;
`};
`

export default Text
