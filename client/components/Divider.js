import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

export const Divider = styled.div`
  border-top: 1px solid ${lighten(0.7, '#000000')};
  width: calc(100% - 40px);
  margin: 20px 0;

  ${props =>
    props.vertical &&
    `
    border-top: none;
    border-right: 1px solid ${lighten(0.7, '#000000')};
    height: calc(100% - 40px);
    margin: 0 20px;
`};
`

export const Spacer = styled.div`
  height: 10px;
  width: 100%;
`
