import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 50px);
  grid-gap: 10px;
`

const Slot = styled.div`
  width: 50px;
  height: 50px;
  background: black;
`

const InventoryTab = ({ items }) => {
  return (
    <Grid>
      {items.map((item, i) => <Slot key={i}>{item}</Slot>)}
    </Grid>
  )
}

export default InventoryTab

