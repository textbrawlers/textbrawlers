import React from 'react'
import styled from 'styled-components'

export const ItemStatRow = styled.tr`color: #1a1a1a;`

export const ItemStat = styled.td`
  font-size: 20px;
  padding: 5px 0;
  text-align: right;

  ${props =>
    props.amount &&
    `
    font-weight:bold;
`};
`
