import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

export const Divider = styled.div`
  background: ${lighten(0.7, '#000000')};
  height: 1px;
  width: calc(100% - 40px);
  margin: 20px 0;

  ${props =>
    props.vertical &&
    `
    background: ${lighten(0.7, '#000000')};
    height: calc(100% - 40px);
    width: 1px;
    margin: 0 20px;
`};
`

export const Spacer = styled.div`
  height: 10px;
  width: calc(100%-40);

  ${props =>
    props.vertical &&
    `
    height: calc(100%-40);
    width: 10px;
`};
`
