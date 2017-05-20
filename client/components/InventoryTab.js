import React from 'react'
import styled from 'styled-components'
import { media } from 'client/util/styleUtils.js'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 50px);
  grid-template-rows: repeat(4, 50px);
  grid-gap: 10px;

  ${media.ltLarge`
    grid-template-columns: repeat(5, 50px);
    grid-template-rows: repeat(8, 50px);
  `}
`

const SlotContainer = styled.div`
  width: 50px;
  height: 50px;
  background: black;
`

const InventoryTab = ({ items }) => {
  return (
    <Grid>
      {items.map((item, i) => <SlotContainer key={i}>{item}</SlotContainer>)}
    </Grid>
  )
}

export default InventoryTab

