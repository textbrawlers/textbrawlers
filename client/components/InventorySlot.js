import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const InventorySlot = styled.div`
  width: 50px;
  height: 50px;
  background: ${lighten(0.1, 'rgb(198, 156, 109)')};
  border: 2px solid rgb(198, 156, 109);

  ${props =>
    props.cluster &&
    `
    width: 950px;
    height: 250px;
    margin: 10px 0;
    background: rgb(198, 156, 109);
    border: none;
`};

  ${props =>
    props.stats &&
    `
    border: none;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items:stretch;
    height: initial;
    width: initial;
    width: 200px;
    background: none;
    font-size: 16px;
`};
`

export default InventorySlot
