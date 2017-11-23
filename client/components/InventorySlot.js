import React from 'react'
import styled from 'styled-components'

const InventorySlot = styled.div`
  width: 50px;
  height: 50px;
  margin: 5px;
  background: orange;

  ${props =>
    props.cluster &&
    `
    width: 950px;
    height: 250px;
    margin: 10px 0;
    background: orange;
`};

  ${props =>
    props.stats &&
    `
    display: flex;
    flex-direction: column;
    align-items:center;
    width: initial;
    height: 250px;
    margin: 10px;
    background: none;
    font-size: 16px;
`};
`

export default InventorySlot
