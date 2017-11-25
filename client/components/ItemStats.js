import React from 'react'
import styled from 'styled-components'

export const ItemStatTable = styled.table`margin: 0 5px;`

export const ItemStatRow = styled.tr`color: #1a1a1a;`

export const ItemStat = styled.td`
  font-size: 16px;
  padding: ;
  text-align: right;
  &:nth-child(even) {
    text-align: left;
  }

  ${props =>
    props.amount &&
    `
    font-weight:bold;
`};
`

export const ItemStatTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  padding: 3px;
  margin: 0px 0px 5px 0px;
  width: 200px;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: rgb(198, 156, 109);

  ${props =>
    props.common &&
    `
    background: #cacaca;
`};

  ${props =>
    props.uncommon &&
    `
    background: rgb(107, 198, 70);
`};

  ${props =>
    props.rare &&
    `
    background: rgb(109, 149, 188);
`};

  ${props =>
    props.legendary &&
    `
    background: rgb(173, 119, 198);
`};
`
